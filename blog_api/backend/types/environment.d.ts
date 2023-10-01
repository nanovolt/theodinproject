export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // [key: string]: string | undefined;
      MONGO: string;
      JWT_SECRET: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}
