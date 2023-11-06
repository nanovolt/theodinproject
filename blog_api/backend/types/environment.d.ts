export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // [key: string]: string | undefined;
      MONGO: string;
      JWT_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      EXPRESS_SESSION_SECRET: string;
      REDIS_URL: string;
      CORS_HOST: string;
    }
  }

  namespace Express {
    interface User {
      id: string;
      username: string;
    }
  }
}
