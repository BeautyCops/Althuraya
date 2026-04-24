# Althuraya — دعوات إلكترونية

تطبيق الواجهة مبني بـ **Vite** و**React** و**TanStack Start** (مجلد `src/`).

## تطوير محلي

```bash
npm install
npm run dev
```

## بناء للإنتاج

```bash
npm run build
```

المخرجات: `dist/client` (الأصول) + `dist/server` (Worker وإعداد `wrangler`).

## نشر الموقع على النطاق (مهم)

إذا رفعتَ **ملفات المشروع من الجذر كما هي** (أو `index.html` قديمًا) إلى استضافة تعرض **الصفحة الافتراضية** من ملف `index.html`، سيظهر **النسخة القديمة** (صفحة HTML ثابتة).

- النسخة الحالية **ليست** مجلد HTML ثابت — هي تطبيق يعمل على **Cloudflare Workers** (أو بيئة تدعم الـ worker المُولَّد).
- **لا تستخدم** `legacy-static/` كجذر للنطاق الإنتاجي — أرشيف فقط.

### نشر بـ Cloudflare (موصى به)

1. ثبّت [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) إن لزم: `npm install` يضم `wrangler` كاعتماد تطوير.
2. سجّل دخولك: `npx wrangler login`
3. من جذر المشروع:

   ```bash
   npm run build
   npm run deploy
   ```

4. اربط النطاق `althuraya.store` بالـ Worker/الحساب في لوحة **Cloudflare** (DNS أو Routes حسب إعدادك).

### متغيرات بيئة (مثل نموذج الاتصال)

 انسخ `.dev.vars.example` إلى `.dev.vars` للتجربة محليًا. في Cloudflare عرّف الأسرار من لوحة **Workers** → **Settings** → **Variables** (مثل `CONTACT_WEBHOOK_URL` إن وُجد).

---

النسخة الـ HTML القديمة (غير المستخدمة للنشر): [legacy-static/README.md](legacy-static/README.md)
