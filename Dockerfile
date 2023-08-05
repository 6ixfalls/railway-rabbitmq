FROM rabbitmq:management-alpine

ARG RABBITMQ_DEFAULT_USER RABBITMQ_DEFAULT_PASS RABBITMQ_DEFAULT_VHOST

COPY rabbitmq.conf /etc/rabbitmq/rabbitmq.conf