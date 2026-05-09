# glibc لتقليل أعطال الـ natives مقارنة بـ Alpine (مثل lightningcss/esbuild على musl).
FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# نفس مسار GitHub Pages: ملفات ثابتة ومعاينات في dist/client (بدون Cloudflare Worker المعايش لـ vite preview).
ENV GH_PAGES=1
RUN npm run build

ENV NODE_ENV=production

EXPOSE 4173

# استضافة SPA ثابتة على كل الواجهات والمنفذ الذي يحقنه Railway ($PORT).
CMD ["sh", "-c", "exec ./node_modules/.bin/serve dist/client -s --no-clipboard --listen tcp://0.0.0.0:${PORT:-4173}"]
