interface ImportMetaEnv {
  readonly VITE_BACK_END_URL: string;
  readonly VITE_APP_PORT: number?;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
