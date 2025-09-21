/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  // aur bhi jo env variables ho unko yahan declare karo
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
