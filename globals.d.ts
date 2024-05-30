namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_URL: string;
    CREDENTIALS_PASSWORD_LENGTH: string;
    CREDENTIALS_SALTROUND: string;
    NODE_MAILER_EMAIL_ACC: string;
    NODE_MAILER_EMAIL_PASS: string;
    OTP_MAX_ATTEMPTS: string;
  }
}
