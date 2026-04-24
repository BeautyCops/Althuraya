# تصاميمي في Canva — الثريا للدعوات

أداة محلية (Node.js، بلا مكتبات خارجية) لجلب قائمة تصاميمك من حسابك في Canva عبر **Canva Connect API** باستخدام تدفق OAuth 2.0 + PKCE، ثم حفظها كـ JSON وصفحة HTML قابلة للتصفح.

---

## 1) التجهيز لمرة واحدة في بوابة المطورين

افتحي تكاملك على:
<https://www.canva.com/developers/integrations/connect-api/OC-AZ23fG0IC40H/configuration>

ثم أكملي الإعدادات التالية:

### Scopes (الصلاحيات)

**للبداية (الأقل أخطاء — يُنصح به):** فعّلي **فقط** مربع قراءة `design:meta` (Read) واحفظي. السكربت الافتراضي يطلب `design:meta:read` فقط، وهو ما يكفي **للحصول على قائمة التصاميم**.

**للتوسع لاحقاً:** فعّلي في البوابة ثم احفظي: `asset`، `design:content`، `folder` (حسب حاجتك). بعدها:

- إمّا تضيفي في `.env` سطر `CANVA_SCOPES=...` بنفس الـ API scopes المذكورة في [وثائق Scopes](https://www.canva.dev/docs/connect/appendix/scopes/) (مفصولة بمسافات)،
- أو تشغّلي `node list-designs.mjs --full-scopes` بعد تفعيل المجموعة الموسّعة المطابقة في البوابة.

> **تجنّب** عادةً: `app`، `brandtemplate:*`، `design:permission`، `folder:permission` — تتطلب نماذج/موافقات أخرى.

> **مبدأ الأمان**: التوكن يبقى محلياً في `tokens.json`. لإلغائه: `npm run logout`.

### Authentication → Redirect URLs
أضيفي هذا العنوان **حرفياً**:

```
http://127.0.0.1:3000/oauth/callback
```

### Credentials
- انسخي **Client ID** (لديك: `OC-AZ23fG0IC40H`).
- ولّدي **Client Secret** (يبدأ بـ `cnvca…`) واحفظيه — لن يُعرَض مرة أخرى.

---

## 2) إعداد المشروع محلياً

من داخل مجلد `canva-designs`:

```powershell
copy .env.example .env
notepad .env
```

املئي القيم:

```env
CANVA_CLIENT_ID=OC-AZ23fG0IC40H
CANVA_CLIENT_SECRET=cnvca...
CANVA_REDIRECT_URI=http://127.0.0.1:3000/oauth/callback
```

> ⚠️ لا ترفعي ملف `.env` ولا `tokens.json` إلى أي مستودع عام. ملف `.gitignore` يستثنيهما أصلاً.

---

## 3) التشغيل

```powershell
node list-designs.mjs
```

أو:

```powershell
npm run list
```

**ما الذي سيحدث؟**
1. الأداة تبدأ خادم استدعاء محلي على `127.0.0.1:3000`.
2. يُفتح متصفحك تلقائياً على صفحة تفويض Canva — وافقي على الصلاحيات.
3. Canva تُعيدك إلى `http://127.0.0.1:3000/oauth/callback` مع رمز تفويض.
4. الأداة تتبادل الرمز مع `access_token` + `refresh_token` وتحفظهما في `tokens.json`.
5. تُستدعى نقطة `GET /rest/v1/designs` مع التنقّل التلقائي بين الصفحات (`continuation`).
6. تُحفظ النتائج في:
   - `designs.json` — كامل البيانات من الـ API.
   - `designs.html` — معرض بصري قابل للبحث، يُفتح تلقائياً.

بعد أول مرة لن تحتاجي لإعادة تسجيل الدخول؛ الأداة تُجدد الرمز عبر `refresh_token` تلقائياً.

---

## 4) تسجيل الخروج / إلغاء الرموز محلياً

```powershell
npm run logout
```

يحذف `tokens.json`. عند التشغيل التالي سيبدأ التفويض من جديد.

---

## هيكل المخرجات

### `designs.json`

```json
[
  {
    "id": "DAFVztcvd9z",
    "title": "دعوة زفاف — مثال",
    "owner": { "user_id": "...", "team_id": "..." },
    "thumbnail": { "width": 595, "height": 335, "url": "https://…" },
    "urls": {
      "edit_url": "https://www.canva.com/api/design/…/edit",
      "view_url": "https://www.canva.com/api/design/…/view"
    },
    "created_at": 1712000000,
    "updated_at": 1745200000,
    "page_count": 3
  }
]
```

### `designs.html`
صفحة RTL عربية بتصميم داكن، بها:
- شبكة مصغّرات التصاميم.
- حقل بحث فوري (بالعنوان أو المعرّف).
- أزرار **تحرير** و **عرض** (روابط مؤقتة صالحة 30 يوماً).

> ملاحظات من Canva:
> - روابط `edit_url` / `view_url` صالحة لمدة **30 يوماً**.
> - رابط المعاينة (thumbnail) صالح لمدة **15 دقيقة** فقط — أعيدي توليد `designs.html` لتحديثها.

---

## استكشاف الأخطاء

| الخطأ | السبب والحل |
|---|---|
| **`invalid_scope`** (في المتصفح أو الطرفية) | كل `scope` في رابط التفويض **يجب** أن يطابق **صندوقاً مُفعّلاً** في Scopes + الضغط على **حفظ**. ابدأي بسكربت الافتراضي (`design:meta:read` فقط) مع تفعيل صندوق `design:meta` → Read. احذفي أي سطر `CANVA_SCOPES=...` من `.env` وجرّبي ثانياً. |
| **صفحة خطأ عامة / لا يقبل تسجيل الدخول** | تحقّقي من **نوع التكامل** في [Your integrations](https://www.canva.com/developers/integrations): **Private** مخصص لفرق [Canva Enterprise](https://www.canva.com/enterprise/) فقط — إن لم تكني على خطة مؤسسات لن يعمل تفويض المستخدم. للتجربة الشخصية أنشئي تكاملاً **Public** (يمكنك التطوير محلياً مع `127.0.0.1` كـ redirect). |
| **لا يظهر Create integration** / قيود | يجب تفعيل [التحقق بخطوتين (MFA)](https://www.canva.com/help/login-verification/) على الحساب قبل إنشاء تكامل. |
| `invalid_grant` | رمز التفويض منتهٍ أو غير مطابق. أعيدي التشغيل. |
| `invalid_client` / `Client secret is invalid` | الـ Client Secret خطأ — ولّدي واحداً جديداً من البوابة. |
| `redirect_uri_mismatch` | `CANVA_REDIRECT_URI` في `.env` لا يطابق ما أضفتِه في بوابة المطورين. |
| `insufficient_scope` | انسي إضافة `design:meta:read` في Scopes بالبوابة. |
| المتصفح لا يُفتح تلقائياً | انسخي الرابط المطبوع في الطرفية والصقيه في المتصفح يدوياً. |
| المنفذ 3000 مشغول | غيّري `CANVA_REDIRECT_URI` إلى منفذ آخر، وعدّلي نفس القيمة في بوابة المطورين. |

---

## السلامة

- `client_secret` و `tokens.json` يبقيان على جهازك فقط.
- يُستخدم PKCE (SHA-256) و CSRF state لحماية التدفق.
- الافتراضي يطلب `design:meta:read` فقط، ما لم توسّعي `CANVA_SCOPES` أو تستخدمي `--full-scopes`.
