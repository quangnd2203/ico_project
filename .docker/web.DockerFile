ARG APP=/ppcb_web

FROM node:21-alpine AS build-webpack
WORKDIR /node
COPY ./web .
RUN cd node && \ 
    npm install && \
    npm run build

# Environemnt to install flutter and build web
FROM debian:latest AS build-env

# install all needed stuff
RUN apt-get update
RUN apt-get install -y curl git unzip

# define variables
ARG FLUTTER_SDK=/usr/local/flutter
ARG FLUTTER_VERSION=3.22.3
ARG APP

#clone flutter
RUN git clone https://github.com/flutter/flutter.git $FLUTTER_SDK
# change dir to current flutter folder and make a checkout to the specific version
RUN cd $FLUTTER_SDK && git fetch && git checkout $FLUTTER_VERSION

# setup the flutter path as an enviromental variable
ENV PATH="$FLUTTER_SDK/bin:$FLUTTER_SDK/bin/cache/dart-sdk/bin:${PATH}"

# Start to run Flutter commands
# doctor to see if all was installes ok
RUN flutter doctor -v

# stup new folder as the working directory
WORKDIR $APP

COPY ./web $APP

COPY --from=build-webpack /node/web/.dist $APP/web/.dist/

# Run build: 1 - clean, 2 - pub get, 3 - build web
RUN flutter clean
RUN flutter pub get
RUN flutter build web --web-renderer canvaskit --release --dart-define FLAVOR=dev

# once heare the app will be compiled and ready to deploy

# use nginx to deploy
FROM nginx:1.25.2-alpine

ARG APP

# copy the nginx config file
COPY --from=build-env "${APP}/nginx.conf" /etc/nginx/conf.d/default.conf


# copy the info of the builded web app to nginx
COPY --from=build-env "${APP}/build/web" /usr/share/nginx/html

# Expose and run nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

WORKDIR $APP