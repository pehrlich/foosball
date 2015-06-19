FROM mesosphere/nginx-busybox:1.0

MAINTAINER mesosphere

ADD api /usr/html/api
ADD api/index.html /usr/html/index.html
ADD nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["/usr/sbin/nginx"]
