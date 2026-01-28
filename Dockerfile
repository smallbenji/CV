FROM docker.io/library/nginx
COPY ./public /usr/share/nginx/html

RUN sed -i "s/CACHE_BUSTER/$(date +%Y%m%d%H%M%S)/g" /usr/share/nginx/html/*.html
