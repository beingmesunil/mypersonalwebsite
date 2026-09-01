/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional HTTPS endpoint that receives contact form submissions. */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Optional Google Maps embed URL for the contact section. */
  readonly VITE_MAP_EMBED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
