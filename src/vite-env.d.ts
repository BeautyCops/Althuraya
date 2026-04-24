/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** عنوان POST كامل لنموذج الاتصال (مطلوب عند نشر GitHub Pages بدون خادم) */
  readonly VITE_CONTACT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
