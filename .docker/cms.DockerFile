FROM node:slim

WORKDIR /app

EXPOSE 3001

ENTRYPOINT ["tail", "-f", "/dev/null"]