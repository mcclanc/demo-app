FROM alpine

LABEL maintainer "Roman Dodin <dodin.roman@gmail.com>"
LABEL description "Nginx + uWSGI + Flask based on Alpine Linux and managed by Supervisord"

# Copy python requirements file
COPY requirements.txt /tmp/requirements.txt

RUN mkdir /app && cp -R ./caspyr ./app

RUN apk add --no-cache \
    python3 \
    bash \
    build-essentials \
    libssl-dev \
    libffi-dev \
    python3-setuptools \
    supervisor \
    python3-dev \
    git \
    linux-headers && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    pip3 install -r /tmp/requirements.txt && \
    pip3 install gunicorn flask flask_cors requests

# Copy the Supervidor config
COPY app.conf /etc/supervisor/conf.d/


# Add demo app
COPY ./app /app
WORKDIR /app

RUN supervisorctl reread && systemctl restart supervisor && supervisorctl status
