---
name: No dotenv in Node 24
description: Node 24 has built-in env file loading, don't install dotenv
type: feedback
---

Don't install dotenv — Node 24 has built-in support for loading env files.

**Why:** User is running Node 24 which supports `--env-file` flag natively.
**How to apply:** When env vars need loading, use Node's built-in `--env-file` flag instead of installing dotenv.
