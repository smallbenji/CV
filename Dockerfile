FROM docker.io/library/nginx
COPY ./public /usr/share/nginx/html

RUN sed -i "s/VERSION_PLACEHOLDER/${BUILD_ID}/g" /usr/share/nginx/html/*.html
