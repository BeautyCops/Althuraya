# glibc لتقليل أعطال الـ natives مقارنة بـ Alpine (مثل lightningcss/esbuild على musl).
FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# نفس مسار GitHub Pages: ملفات ثابتة ومعاينات في dist/client (بدون Cloudflare Worker المعايش لـ vite preview).
ENV GH_PAGES=1
RUN npm run build
RUN test -f dist/client/index.html

ENV NODE_ENV=production

EXPOSE 4173

# استضافة SPA ثابتة. استخدام صيغة الـ CMD shell حتى لا يطبِّع Docker المتغير $PORT وقت البناء
# فيُثبَّت المنفذ خطأ؛ Railway يحقن PORT عند التشغيل فقط.
CMD exec ./node_modules/.bin/serve dist/client -s --no-clipboard --listen tcp://0.0.0.0:${PORT:-4173}
