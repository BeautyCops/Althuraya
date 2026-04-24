# Althuraya — دعوات إلكترونية

تطبيق الواجهة مبني بـ **Vite** و**React** و**TanStack Start** (مجلد `src/`).

## تطوير محلي

```bash
npm install
npm run dev
```

## بناء

| الأمر | النتيجة |
|--------|---------|
| `npm run build` | إنتاج عادي: أصول + **Cloudflare Worker** (`dist/client` + `dist/server`) |
| `npm run build:github-pages` | **ملفات ثابتة** + prerender — مناسب لـ **GitHub Pages** (بدون Worker) |

## نشر — GitHub Pages (الوضع الافتراضي لدينا)

1. في المستودع على GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. بعد أول `push` إلى `main`، سيعمل سير العمل [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml) ويُنشر محتوى `dist/client` تلقائياً.
3. **نطاق مخصص** (مثل `althuraya.store`): أضفيه من **Settings → Pages → Custom domain**، وضع `VITE_BASE` في **Settings → Secrets and variables → Actions → Repository variables** = `/` (أو اتركه بدون متغير؛ الافتراضي `/`).

إذا عرضت الصفحة على **عنوان GitHub الافتراضي** `https://USER.github.io/REPO/`: عيّن متغير الريبو `VITE_BASE` إلى `/REPO/` (مثال: `/Althuraya/`) بشرط تطابق حروف اسم المستودع.

### نموذج الاتصال على Pages

GitHub Pages **لا يشغّل** `/api/contact`. لإيصال النموذج لاحقاً:

- عرّف متغير الريبو **`VITE_CONTACT_API_URL`** (رابط POST كامل لنفس الـ API على خادم آخر مثل Cloudflare Worker)، **أو**
- اترك الحقل وربطي النموذج لاحقاً.

## نشر اختياري — Cloudflare Worker

ممنوح إن رغبتِ في خادم وواجهة معاً من نفس البناء الافتراضي:

```bash
npm run build
npm run deploy:cloudflare
```

(يتطلب `npx wrangler login` وضبط المشروع في Cloudflare.)

---

النسخة الـ HTML القديمة (مؤرشفة): [legacy-static/README.md](legacy-static/README.md)
