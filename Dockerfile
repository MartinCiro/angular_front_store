# Dockerfile.final
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx ng build --configuration=production --ssr=false

FROM nginx:alpine

# Limpiar archivos por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar aplicación
COPY --from=builder /app/dist/blog/browser/ /usr/share/nginx/html/

# Configuración Nginx COMPLETA y CORRECTA
RUN echo 'user nginx; \
worker_processes auto; \
error_log /var/log/nginx/error.log warn; \
pid /var/run/nginx.pid; \
\
events { \
    worker_connections 1024; \
} \
\
http { \
    include /etc/nginx/mime.types; \
    default_type application/octet-stream; \
    \
    log_format main '"'"'$remote_addr - $remote_user [$time_local] "$request" '"'"' \
                      '"'"'$status $body_bytes_sent "$http_referer" '"'"' \
                      '"'"'"$http_user_agent" "$http_x_forwarded_for"'"'"'; \
    \
    access_log /var/log/nginx/access.log main; \
    \
    sendfile on; \
    tcp_nopush on; \
    \
    keepalive_timeout 65; \
    \
    # Configuración del SERVER principal \
    server { \
        # Escuchar en IPv4 e IPv6 \
        listen 80; \
        listen [::]:80; \
        \
        server_name _; \
        root /usr/share/nginx/html; \
        index index.html; \
        \
        # Angular SPA routing \
        location / { \
            try_files $uri $uri/ /index.html; \
        } \
        \
        # Cache para archivos estáticos \
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
            expires 1y; \
            add_header Cache-Control "public, immutable"; \
        } \
        \
        # Error pages (opcional) \
        error_page 500 502 503 504 /50x.html; \
        location = /50x.html { \
            root /usr/share/nginx/html; \
        } \
    } \
}' > /etc/nginx/nginx.conf

# Verificar configuración
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]