/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** عنوان POST كامل لنموذج الاتصال (مطلوب عند نشر GitHub Pages بدون خادم) */
  readonly VITE_CONTACT_API_URL?: string;
  /**
   * أصل الموقع بدون شرطة مائلة أخيرة (مثل https://althuraya.store).
   * يُستخدم لبناء روابط og:image المطلقة عند مشاركة الرابط خارجيًا.
   */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
