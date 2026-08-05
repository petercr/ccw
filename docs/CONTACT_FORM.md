# Contact Form (Neon + Zoho SMTP + Sanity)

The contact form at `/contact` stores submissions in a **Neon** Postgres database, mirrors them into **Sanity Studio** for editorial follow-up, and sends an automated reply via **Zoho Mail SMTP**.

## Architecture

```
Browser → POST /api/contact → validate (Zod)
                          → INSERT contact_submissions (Neon)          [required]
                          → create contactSubmission (Sanity)          [soft-fail]
                          → send auto-reply (Zoho SMTP)                [soft-fail]
                          → JSON { success, id }
```

- **API route:** `apps/frontend/src/routes/api.contact.ts`
- **Business logic:** `apps/frontend/src/server/contact/handleContactSubmission.ts`
- **DB:** `apps/frontend/src/db/client.ts` (creates table on first use)
- **Sanity sync:** `apps/frontend/src/server/contact/syncContactSubmissionToSanity.ts`
- **Email:** `apps/frontend/src/server/email/zohoSmtp.ts`
- **Studio schema:** `apps/studio/src/schemaTypes/documentTypes/contactSubmission.ts`

Neon remains the durable app store of record. Sanity is a **mirror** for non-technical editors to view leads and track response status.

## Database schema (Neon)

Table `contact_submissions` (auto-created if missing):

| Column               | Type        | Notes                          |
|----------------------|-------------|--------------------------------|
| `id`                 | UUID        | Primary key (`gen_random_uuid`) |
| `first_name`         | TEXT        | Required                       |
| `last_name`          | TEXT        | Required                       |
| `email`              | TEXT        | Required (reply recipient)     |
| `reason_for_message` | TEXT        | Required                       |
| `additional_info`    | TEXT        | Optional                       |
| `created_at`         | TIMESTAMPTZ | Default `NOW()`                |

## Sanity schema (`contactSubmission`)

| Field              | Type     | Notes |
|--------------------|----------|--------|
| `firstName`        | string   | Read-only (from form) |
| `lastName`         | string   | Read-only |
| `email`            | string   | Read-only |
| `reasonForMessage` | string   | Read-only |
| `additionalInfo`   | text     | Read-only |
| `submittedAt`      | datetime | Read-only (from Neon `created_at`) |
| `neonId`           | string   | Neon UUID; used for idempotency |
| `responseStatus`   | string   | `new` \| `in_progress` \| `replied` \| `closed` \| `spam` |
| `responseCategory` | string   | Optional: `general`, `audit_request`, `partnership`, `support`, `other` |
| `internalNotes`    | text     | Editor-only |
| `lastContactedAt`  | datetime | Optional |

Document id is deterministic: `contactSubmission-{neonId}` via `createIfNotExists`, so retries do not duplicate docs.

Studio: **Contact submissions** desk section with filters (All / New / In progress / Replied / Closed & spam), sorted by `submittedAt` desc.

## Environment variables

Set these in `apps/frontend/.env.local`, in Vercel project settings, and as **GitHub Actions secrets** where e2e needs real backend (mocked e2e does not require write token):

| Variable          | Required | Description                                      |
|-------------------|----------|--------------------------------------------------|
| `DATABASE_URL`    | Yes      | Neon connection string (pooled recommended)      |
| `SANITY_WRITE_TOKEN` | Yes*  | Server-only Sanity token with create permission on `contactSubmission`. *Required to appear in Studio; form still succeeds without it (sync skipped + warning log). |
| `ZOHO_SMTP_HOST`  | No       | Default `smtp.zoho.com`                          |
| `ZOHO_SMTP_PORT`  | No       | Default `465` (SSL). Use `587` for STARTTLS    |
| `ZOHO_SMTP_USER`  | Yes      | Zoho mailbox username                            |
| `ZOHO_SMTP_PASS`  | Yes      | Zoho password or app-specific password           |
| `ZOHO_SMTP_FROM`  | No       | From address (defaults to `ZOHO_SMTP_USER`)      |

### Sanity write token

1. Open [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **Tokens**.
2. Create a token with **Editor** (or a custom role that can create `contactSubmission` documents).
3. Set `SANITY_WRITE_TOKEN` only on the server (Vercel / `.env.local`). **Never** use a `VITE_` prefix.
4. After schema changes, regenerate types:

```bash
cd apps/studio && npm run generate-types
npm run build --workspace=@santan/shared
```

### Neon setup

1. Create a free project at [console.neon.tech](https://console.neon.tech).
2. Copy the connection string (prefer the **pooled** endpoint for serverless).
3. Set `DATABASE_URL` in local env and Vercel.

The app runs `CREATE TABLE IF NOT EXISTS` on first submission; no manual migration is required.

### GitHub Actions secrets

Required for e2e CI when not fully mocked:

```bash
gh secret set DATABASE_URL
gh secret set ZOHO_SMTP_USER
gh secret set ZOHO_SMTP_PASS
gh secret set ZOHO_SMTP_FROM
# Optional for CI unless e2e asserts Sanity docs:
# gh secret set SANITY_WRITE_TOKEN
```

Or pipe from local env (do not log values):

```bash
printf '%s' "$DATABASE_URL" | gh secret set DATABASE_URL
```

### Zoho SMTP setup

1. Use a Zoho Mail mailbox for your domain (or Zoho free personal mail).
2. If 2FA is enabled, create an [app-specific password](https://www.zoho.com/mail/help/adminconsole/two-factor-authentication.html).
3. Typical settings:
   - Host: `smtp.zoho.com` (or `smtp.zoho.eu` / `smtp.zoho.in` for regional accounts)
   - Port: `465` with SSL, or `587` with STARTTLS
4. Set `ZOHO_SMTP_USER`, `ZOHO_SMTP_PASS`, and optionally `ZOHO_SMTP_FROM`.

## Error handling

| Failure                         | Behavior                                                                 |
|---------------------------------|--------------------------------------------------------------------------|
| Validation error                | `400` with `fieldErrors` map; nothing stored                             |
| Database error                  | `500`; logged as `[contact] Failed to store submission`                  |
| Sanity sync error after DB      | Still `200` success; logged as `[contact] Failed to sync submission to Sanity` |
| Missing `SANITY_WRITE_TOKEN`    | Still `200` success; warning log; no Sanity doc                          |
| Email error after successful DB | Still `200` success; logged as `[contact] Failed to send reply email`    |
| Invalid JSON body               | `400`                                                                    |

## Local testing without real SMTP/DB/Sanity

Point e2e or manual UI tests at a mocked `/api/contact` (see `e2e/contact.spec.ts`).

Unit tests for validation and handler logic live under:

- `apps/frontend/src/server/contact/__tests__/`
