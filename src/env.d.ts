/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly SMTP_USER: string;
  readonly SMTP_PASSWORD: string;
  readonly GHOST_API_KEY: string;
  readonly GOOGLE_SHEET_ID: string;
  readonly GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  readonly GOOGLE_PROJECT_ID: string;
  readonly GOOGLE_PRIVATE_KEY_ID: string;
  readonly GOOGLE_PRIVATE_KEY: string;
}
