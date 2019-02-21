FROM ubuntu:16.04

RUN apt update && apt install -y \
    python3 \
    python3-pip \
    libssl-dev \
    libffi-dev \
    python3-setuptools \
    supervisor \
    python3-dev && \
    pip3 install gunicorn flask flask_cors requests

# Copy the Supervidor config
COPY app.conf /etc/supervisor/conf.d/

RUN whoami && mkdir /app

ADD caspyr /app/caspyr

# Add demo app
WORKDIR /app
