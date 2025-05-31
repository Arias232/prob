FROM nginx:1.27-alpine

# Elimina la configuración por defecto de Nginx
RUN rm -f /etc/nginx/conf.d/default.conf

# Copia tu configuración personalizada
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos de tu frontend (HTML, CSS, JS)
# Asegúrate que estos archivos (index.html, app.js, style.css) están directamente en la carpeta 'frontend/'
# O si están en una subcarpeta, ajusta la ruta del COPY, por ejemplo: COPY ./public/ /usr/share/nginx/html
COPY ./index.html /usr/share/nginx/html/
COPY ./style.css /usr/share/nginx/html/
COPY ./app.js /usr/share/nginx/html/
# Si tienes otros archivos estáticos, cópialos también.

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]