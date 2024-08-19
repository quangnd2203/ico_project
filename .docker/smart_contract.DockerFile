FROM node:18-alpine

RUN apk update && \
    apk add git  && \
    apk add --update python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /smart_contract

COPY ./smart_contract ./

RUN npm install