FROM nginx:1.13.1-alpine

COPY dist/ /usr/share/nginx/html
