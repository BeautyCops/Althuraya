#!/usr/bin/env node
// Althuraya Invitations — Canva Designs fetcher
// OAuth 2.0 Authorization Code + PKCE (S256) against Canva Connect API.
// Zero external dependencies (Node 18+ required).

import http from "node:http";
import crypto from "node:crypto";
import { URL, URLSearchParams } from "node:url";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKENS_PATH = join(__dirname, "tokens.json");
const DESIGNS_JSON_PATH = join(__dirname, "designs.json");
const DESIGNS_HTML_PATH = join(__dirname, "designs.html");

const AUTH_URL = "https://www.canva.com/api/oauth/authorize";
const TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
const DESIGNS_URL = "https://api.canva.com/rest/v1/designs";

// الافتراضي: scope واحد — يقلل خطأ `invalid_scope` (كل scope في رابط
// التفويض يجب أن يكون مفعّلاً في Scopes). جلب التصاميم يحتاج
// `design:meta:read` فقط.
// للتوسيع: فعّلي الصلاحيات في البوابة، ثم أضيفي في .env:
//   CANVA_SCOPES=design:meta:read design:content:read design:content:write folder:read folder:write asset:read asset:write
// أو: node list-designs.mjs --full-scopes
const MINIMAL_SCOPES = ["design:meta:read"];
const EXPANDED_SCOPES = [
  "design:meta:read",
  "design:content:read",
  "design:content:write",
  "folder:read",
  "folder:write",
  "asset:read",
  "asset:write",
];

// ---------- tiny .env loader (no dependency) ----------
function loadEnv() {
  const envPath = join(__dirname, ".env");
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf8");
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

// ---------- helpers ----------
// PKCE — نفس النموذج الرسمي في:
// https://www.canva.dev/docs/connect/authentication/
function makePkce() {
  const codeVerifier = crypto.randomBytes(96).toString("base64url");
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");
  return { verifier: codeVerifier, challenge: codeChallenge };
}

function randomState() {
  return crypto.randomBytes(96).toString("base64url");
}

function openInBrowser(url) {
  try {
    if (process.platform === "win32") {
      spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore" });
    } else if (process.platform === "darwin") {
      spawn("open", [url], { detached: true, stdio: "ignore" });
    } else {
      spawn("xdg-open", [url], { detached: true, stdio: "ignore" });
    }
  } catch {
    /* ignore; user can paste the URL manually */
  }
}

// ---------- token storage ----------
function loadTokens() {
  if (!existsSync(TOKENS_PATH)) return null;
  try {
    return JSON.parse(readFileSync(TOKENS_PATH, "utf8"));
  } catch {
    return null;
  }
}

function saveTokens(tokens) {
  const payload = {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_type: tokens.token_type,
    scope: tokens.scope,
    expires_at: Math.floor(Date.now() / 1000) + Number(tokens.expires_in || 0),
  };
  writeFileSync(TOKENS_PATH, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

function basicAuthHeader(clientId, clientSecret) {
  return "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
}

// ---------- OAuth: authorization code flow ----------
async function runAuthorizationFlow({ clientId, clientSecret, redirectUri, scopes }) {
  const { verifier, challenge } = makePkce();
  const state = randomState();

  const authUrl = new URL(AUTH_URL);
  authUrl.searchParams.set("code_challenge", challenge);
  // مثل مثال Canva: code_challenge_method=s256
  authUrl.searchParams.set(
    "code_challenge_method",
    (process.env.CANVA_CODE_CHALLENGE_METHOD || "s256").trim()
  );
  authUrl.searchParams.set("scope", scopes.join(" "));
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("redirect_uri", redirectUri);

  const parsedRedirect = new URL(redirectUri);
  const port = Number(parsedRedirect.port || 80);
  const callbackPath = parsedRedirect.pathname || "/";

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const reqUrl = new URL(req.url, `http://${req.headers.host}`);
      if (reqUrl.pathname !== callbackPath) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }
      const receivedState = reqUrl.searchParams.get("state");
      const receivedCode = reqUrl.searchParams.get("code");
      const error = reqUrl.searchParams.get("error");
      const errorDescription = reqUrl.searchParams.get("error_description");

      const finish = (title, body, ok) => {
        res.writeHead(ok ? 200 : 400, {
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${title}</title><style>body{font-family:system-ui,Segoe UI,Tahoma,sans-serif;background:#0f172a;color:#f8fafc;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}.card{background:#1e293b;padding:40px 56px;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.4);max-width:520px}.ok{color:#34d399}.err{color:#f87171}h1{margin:0 0 12px;font-size:22px}p{margin:0;color:#cbd5e1;line-height:1.7}</style></head><body><div class="card"><h1 class="${ok ? "ok" : "err"}">${title}</h1><p>${body}</p></div></body></html>`);
        server.close();
      };

      if (error) {
        const detail = errorDescription
          ? `${error} — ${errorDescription}`
          : error;
        finish(
          "فشل التفويض",
          `الخطأ: <code>${detail}</code>`,
          false
        );
        reject(new Error(`Authorization error: ${detail}`));
        return;
      }
      if (!receivedCode) {
        finish("طلب غير صالح", "لم يُعَد رمز التفويض.", false);
        reject(new Error("No authorization code in callback."));
        return;
      }
      if (receivedState !== state) {
        finish("تحذير أمني", "قيمة الـ state غير مطابقة — تم إلغاء العملية.", false);
        reject(new Error("State mismatch — possible CSRF."));
        return;
      }

      finish(
        "تم التفويض بنجاح",
        "يمكنكِ إغلاق هذه النافذة والعودة إلى الطرفية.",
        true
      );
      resolve(receivedCode);
    });

    server.on("error", reject);
    server.listen(port, "127.0.0.1", () => {
      console.log(`\n🔐 خادم الاستدعاء يستمع على ${redirectUri}`);
      console.log("🌐 جاري فتح صفحة تفويض Canva في المتصفح…");
      console.log("   إن لم تفتح تلقائياً افتحي الرابط يدوياً:\n");
      console.log("   " + authUrl.toString() + "\n");
      console.log(
        "   إن ظهر invalid_scope: تأكدي أن نفس الـ Scopes المطبوعة أعلاه"
      );
      console.log("   مفعّلة + محفوظة في بوابة Canva (ابدأي بصندوق design:meta:read).");
      openInBrowser(authUrl.toString());
    });
  });

  // Exchange code for tokens
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code_verifier: verifier,
    code,
    redirect_uri: redirectUri,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(clientId, clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `Token exchange failed (${res.status}): ${JSON.stringify(data)}`
    );
  }
  return saveTokens(data);
}

async function refreshTokens({ clientId, clientSecret, refreshToken }) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(clientId, clientSecret),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `Refresh failed (${res.status}): ${JSON.stringify(data)}`
    );
  }
  return saveTokens(data);
}

async function getValidAccessToken(cfg) {
  const existing = loadTokens();
  const now = Math.floor(Date.now() / 1000);

  // إذا كانت الصلاحيات المطلوبة الآن ليست مشمولة ضمن التوكن الحالي،
  // نجبر تفويضاً جديداً لنطلب الصلاحيات الجديدة من المستخدم.
  const grantedScopes = new Set((existing?.scope || "").split(/\s+/).filter(Boolean));
  const missingScopes = cfg.scopes.filter((s) => !grantedScopes.has(s));

  if (existing?.access_token && existing.expires_at - 30 > now && missingScopes.length === 0) {
    return existing.access_token;
  }
  if (existing?.refresh_token && missingScopes.length === 0) {
    try {
      console.log("♻️  تجديد رمز الوصول عبر refresh_token…");
      const refreshed = await refreshTokens({
        clientId: cfg.clientId,
        clientSecret: cfg.clientSecret,
        refreshToken: existing.refresh_token,
      });
      return refreshed.access_token;
    } catch (e) {
      console.warn("⚠️  فشل التجديد، سنبدأ تفويضاً جديداً:", e.message);
    }
  }
  if (missingScopes.length > 0 && existing?.access_token) {
    console.log(
      "🆕 تم طلب صلاحيات إضافية غير مشمولة حالياً (" +
        missingScopes.join(" ") +
        ") — سنبدأ تفويضاً جديداً."
    );
  }
  const fresh = await runAuthorizationFlow(cfg);
  return fresh.access_token;
}

// ---------- list designs (with pagination) ----------
async function listAllDesigns(accessToken, { sortBy = "modified_descending" } = {}) {
  const all = [];
  let continuation;
  let page = 0;
  do {
    page++;
    const url = new URL(DESIGNS_URL);
    url.searchParams.set("limit", "100");
    url.searchParams.set("sort_by", sortBy);
    url.searchParams.set("ownership", "any");
    if (continuation) url.searchParams.set("continuation", continuation);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        `List designs failed (${res.status}): ${JSON.stringify(data)}`
      );
    }
    const items = Array.isArray(data.items) ? data.items : [];
    all.push(...items);
    console.log(`📄 الصفحة ${page}: +${items.length} تصميم (المجموع ${all.length})`);
    continuation = data.continuation;
  } while (continuation);
  return all;
}

// ---------- HTML gallery ----------
function buildHtmlGallery(designs) {
  const escape = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  const fmtDate = (unix) =>
    unix ? new Date(unix * 1000).toLocaleString("ar-EG") : "—";

  const cards = designs
    .map((d) => {
      const title = escape(d.title || "بدون عنوان");
      const thumb = d.thumbnail?.url
        ? `<img src="${escape(d.thumbnail.url)}" alt="${title}" loading="lazy">`
        : `<div class="no-thumb">لا توجد معاينة</div>`;
      const edit = escape(d.urls?.edit_url || "#");
      const view = escape(d.urls?.view_url || "#");
      return `
      <article class="card">
        <a class="thumb" href="${view}" target="_blank" rel="noopener">${thumb}</a>
        <div class="meta">
          <h3 title="${title}">${title}</h3>
          <p class="sub">
            <span>صفحات: ${d.page_count ?? "—"}</span>
            <span>عُدِّل: ${fmtDate(d.updated_at)}</span>
          </p>
          <div class="actions">
            <a class="btn primary" href="${edit}" target="_blank" rel="noopener">تحرير</a>
            <a class="btn" href="${view}" target="_blank" rel="noopener">عرض</a>
          </div>
          <p class="id" title="معرّف التصميم">${escape(d.id)}</p>
        </div>
      </article>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>تصاميمي في Canva — الثريا للدعوات</title>
  <style>
    :root { --bg:#0f172a; --card:#1e293b; --muted:#94a3b8; --text:#f8fafc; --accent:#7c3aed; --accent2:#ec4899; }
    * { box-sizing: border-box; }
    body { margin:0; font-family: "Segoe UI", Tahoma, system-ui, sans-serif; background:var(--bg); color:var(--text); }
    header { padding:32px 24px; background: linear-gradient(135deg, var(--accent), var(--accent2)); text-align:center; }
    header h1 { margin:0 0 8px; font-size: 28px; }
    header p { margin:0; opacity:.9; }
    main { max-width:1280px; margin:0 auto; padding:24px; }
    .stats { color:var(--muted); margin:0 0 16px; }
    .search { width:100%; padding:12px 16px; border-radius:12px; border:1px solid #334155; background:#0b1220; color:var(--text); font-size:15px; margin-bottom:20px; }
    .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:20px; }
    .card { background:var(--card); border-radius:14px; overflow:hidden; box-shadow: 0 6px 20px rgba(0,0,0,.25); display:flex; flex-direction:column; transition:transform .15s ease; }
    .card:hover { transform: translateY(-3px); }
    .thumb { display:block; aspect-ratio: 4/3; background:#0b1220; overflow:hidden; }
    .thumb img { width:100%; height:100%; object-fit:cover; display:block; }
    .no-thumb { display:flex; align-items:center; justify-content:center; height:100%; color:var(--muted); font-size:13px; }
    .meta { padding:14px 16px 16px; display:flex; flex-direction:column; gap:8px; }
    .meta h3 { margin:0; font-size:15px; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .sub { margin:0; color:var(--muted); font-size:12px; display:flex; gap:10px; flex-wrap:wrap; }
    .actions { display:flex; gap:8px; margin-top:4px; }
    .btn { flex:1; text-align:center; padding:8px 10px; border-radius:8px; text-decoration:none; font-size:13px; background:#334155; color:var(--text); }
    .btn.primary { background: var(--accent); }
    .btn:hover { filter: brightness(1.1); }
    .id { margin:0; font-size:11px; color:#64748b; direction:ltr; text-align:left; font-family:monospace; }
    footer { text-align:center; color:var(--muted); padding:24px; font-size:13px; }
  </style>
</head>
<body>
  <header>
    <h1>تصاميمي في Canva</h1>
    <p>الثريا للدعوات — مولَّد في ${escape(new Date().toLocaleString("ar-EG"))}</p>
  </header>
  <main>
    <p class="stats">إجمالي التصاميم: <strong>${designs.length}</strong></p>
    <input class="search" id="q" placeholder="ابحثي في التصاميم بالعنوان أو المعرف…" oninput="filter(this.value)">
    <div class="grid" id="grid">
      ${cards}
    </div>
  </main>
  <footer>تم توليد هذه الصفحة محلياً من Canva Connect API. الروابط صالحة لمدة 30 يوماً، والمعاينات لمدة 15 دقيقة.</footer>
  <script>
    function filter(q) {
      q = q.trim().toLowerCase();
      for (const c of document.querySelectorAll('.card')) {
        const text = c.innerText.toLowerCase();
        c.style.display = !q || text.includes(q) ? '' : 'none';
      }
    }
  </script>
</body>
</html>`;
}

// ---------- main ----------
async function main() {
  loadEnv();

  if (process.argv.includes("--logout")) {
    if (existsSync(TOKENS_PATH)) {
      writeFileSync(TOKENS_PATH, "");
      try {
        const fs = await import("node:fs/promises");
        await fs.unlink(TOKENS_PATH);
      } catch {}
    }
    console.log("✅ تم حذف الرموز المحفوظة.");
    return;
  }

  const clientId = process.env.CANVA_CLIENT_ID;
  const clientSecret = process.env.CANVA_CLIENT_SECRET;
  const redirectUri =
    process.env.CANVA_REDIRECT_URI || "http://127.0.0.1:3000/oauth/callback";
  const useFullScopes = process.argv.includes("--full-scopes");
  const scopes = process.env.CANVA_SCOPES?.trim()
    ? process.env.CANVA_SCOPES.split(/\s+/).filter(Boolean)
    : useFullScopes
      ? EXPANDED_SCOPES
      : MINIMAL_SCOPES;

  if (!clientId || !clientSecret) {
    console.error(
      "❌ ناقص: CANVA_CLIENT_ID و/أو CANVA_CLIENT_SECRET.\n" +
        "   انسخي .env.example إلى .env وأكملي القيم."
    );
    process.exit(1);
  }

  console.log("🎨 Althuraya × Canva — جلب قائمة التصاميم");
  console.log("   Client ID:", clientId);
  console.log("   Redirect :", redirectUri);
  console.log("   Scopes   :", scopes.join(" "));

  const accessToken = await getValidAccessToken({
    clientId,
    clientSecret,
    redirectUri,
    scopes,
  });

  console.log("\n📥 جلب التصاميم…");
  const designs = await listAllDesigns(accessToken);

  writeFileSync(DESIGNS_JSON_PATH, JSON.stringify(designs, null, 2), "utf8");
  writeFileSync(DESIGNS_HTML_PATH, buildHtmlGallery(designs), "utf8");

  console.log("\n✅ تم! تم حفظ:");
  console.log("   •", DESIGNS_JSON_PATH);
  console.log("   •", DESIGNS_HTML_PATH);
  console.log(`\nإجمالي التصاميم: ${designs.length}`);

  console.log("\nأحدث 10 تصاميم:");
  for (const d of designs.slice(0, 10)) {
    const when = d.updated_at
      ? new Date(d.updated_at * 1000).toLocaleDateString("ar-EG")
      : "—";
    console.log(
      `  • ${d.id}  [${when}]  ${d.title || "(بدون عنوان)"}`
    );
  }

  openInBrowser("file:///" + DESIGNS_HTML_PATH.replace(/\\/g, "/"));
}

main().catch((err) => {
  console.error("\n💥 خطأ:", err?.message || err);
  process.exit(1);
});
