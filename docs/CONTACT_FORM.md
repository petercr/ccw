# Contact Form (Neon + Zoho SMTP)

The contact form at `/contact` stores submissions in a **Neon** Postgres database and sends an automated reply via **Zoho Mail SMTP**.

## Architecture

```
Browser → POST /api/contact → validate (Zod)
                          → INSERT contact_submissions (Neon)
                          → send auto-reply (Zoho SMTP)
                          → JSON { success, id }
```

- **API route:** `apps/frontend/src/routes/api.contact.ts`
- **Business logic:** `apps/frontend/src/server/contact/handleContactSubmission.ts`
- **DB:** `apps/frontend/src/db/client.ts` (creates table on first use)
- **Email:** `apps/frontend/src/server/email/zohoSmtp.ts`

## Database schema

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

## Environment variables

Set these in `apps/frontend/.env.local`, in Vercel project settings, and as **GitHub Actions secrets** (used by `.github/workflows/e2e-tests.yml`):

| Variable          | Required | Description                                      |
|-------------------|----------|--------------------------------------------------|
| `DATABASE_URL`    | Yes      | Neon connection string (pooled recommended)      |
| `ZOHO_SMTP_HOST`  | No       | Default `smtp.zoho.com`                          |
| `ZOHO_SMTP_PORT`  | No       | Default `465` (SSL). Use `587` for STARTTLS    |
| `ZOHO_SMTP_USER`  | Yes      | Zoho mailbox username                            |
| `ZOHO_SMTP_PASS`  | Yes      | Zoho password or app-specific password           |
| `ZOHO_SMTP_FROM`  | No       | From address (defaults to `ZOHO_SMTP_USER`)      |

### Neon setup

1. Create a free project at [console.neon.tech](https://console.neon.tech).
2. Copy the connection string (prefer the **pooled** endpoint for serverless).
3. Set `DATABASE_URL` in local env and Vercel.

The app runs `CREATE TABLE IF NOT EXISTS` on first submission; no manual migration is required.

### GitHub Actions secrets

Required for e2e CI (production server under Playwright):

```bash
gh secret set DATABASE_URL
gh secret set ZOHO_SMTP_USER
gh secret set ZOHO_SMTP_PASS
gh secret set ZOHO_SMTP_FROM
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
| Email error after successful DB | Still `200` success; logged as `[contact] Failed to send reply email`    |
| Invalid JSON body               | `400`                                                                    |

## Local testing without real SMTP/DB

Point e2e or manual UI tests at a mocked `/api/contact` (see `e2e/contact.spec.ts`).

Unit tests for validation and handler logic live under:

- `apps/frontend/src/server/contact/__tests__/`
