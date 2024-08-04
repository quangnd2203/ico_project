FROM node:slim

WORKDIR /app

COPY ./back_end/package.json ./

EXPOSE 3000

