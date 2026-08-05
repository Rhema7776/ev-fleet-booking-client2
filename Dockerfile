# ---------- Stage 1: build the Vite bundle ----------
# Vite 8 requires node ^20.19.0 || >=22.12.0. Every native dep in the lockfile
# (rolldown, tailwindcss/oxide, lightningcss) publishes a linux-x64-musl
# binding, so alpine is safe here.
FROM node:22-alpine AS build

WORKDIR /app

# Install from the lockfile first so this layer survives source-only changes.
# Not --omit=dev: vite and its plugins live in devDependencies.
COPY package.json package-lock.json ./
RUN npm ci

# Vite inlines env vars at build time, so anything the bundle needs must arrive
# as a --build-arg. Setting it on the Cloud Run service has no effect.
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Without this the bundle silently falls back to the dev localhost URL and the
# breakage only shows up in the browser, after a deploy. Fail here instead.
RUN test -n "$VITE_API_BASE_URL" \
 || (echo "ERROR: build arg VITE_API_BASE_URL is required, e.g. --build-arg VITE_API_BASE_URL=https://api.example.com/api/v1" >&2 && exit 1)

COPY . .
RUN npm run build

# ---------- Stage 2: serve the static bundle ----------
FROM nginx:1.29-alpine AS runtime

# Cloud Run injects PORT and expects the container to listen on it.
ENV PORT=8080
# Restrict envsubst to PORT so nginx's own $uri-style variables survive.
ENV NGINX_ENVSUBST_FILTER=PORT

COPY --from=build /app/dist /usr/share/nginx/html

# The base image entrypoint runs envsubst over /etc/nginx/templates and writes
# the result to /etc/nginx/conf.d, so the listen port resolves at startup.
RUN rm -f /etc/nginx/conf.d/default.conf \
 && mkdir -p /etc/nginx/templates \
 && printf '%s\n' \
    'server {' \
    '    listen      ${PORT};' \
    '    server_name _;' \
    '    root        /usr/share/nginx/html;' \
    '' \
    '    gzip            on;' \
    '    gzip_vary       on;' \
    '    gzip_min_length 1024;' \
    '    gzip_proxied    any;' \
    '    gzip_types      text/plain text/css application/javascript application/json image/svg+xml font/woff2;' \
    '' \
    '    # Bundled assets carry a content hash, so they can never go stale.' \
    '    location /assets/ {' \
    '        access_log off;' \
    '        add_header Cache-Control "public, max-age=31536000, immutable";' \
    '        try_files $uri =404;' \
    '    }' \
    '' \
    '    # Must stay uncached or clients keep booting a stale bundle.' \
    '    location = /index.html {' \
    '        add_header Cache-Control "no-store";' \
    '    }' \
    '' \
    '    # createBrowserRouter owns every path the filesystem does not.' \
    '    location / {' \
    '        try_files $uri $uri/ /index.html;' \
    '    }' \
    '}' \
    > /etc/nginx/templates/default.conf.template

EXPOSE 8080

# CMD is inherited from the base image: nginx -g "daemon off;"
