FROM node:6

ENV FRIGGR_PORT 80

RUN mkdir -p /data
RUN mkdir -p /app
COPY . /app

WORKDIR /app
CMD [ "npm", "start" ]
