import { loadEnvFile } from 'node:process';

try {
  loadEnvFile('apps/frontend/.env.local');
} catch {
  // .env.local may not exist in CI where env vars are set directly
}
