FROM jedisct1/phusion-baseimage-latest
MAINTAINER Daniel Haus <daniel.haus@businesstools.de>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -yq nodejs python build-essential

# Fix npm inside docker image
# see https://github.com/npm/npm/issues/9863
RUN cd $(npm root -g)/npm \
    && npm install fs-extra \
    && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

# Circumvent missing package problem ("nan") with node-gyp
# https://github.com/ncb000gt/node.bcrypt.js/issues/428
RUN cd $(npm root -g)/npm && \
    npm install nan && \
    npm install -g node-gyp

ADD package.json /tmp/package.json
RUN cd /tmp && npm install && npm cache clean
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app/

ADD package.json            /usr/app/
ADD tasks/                  /usr/app/tasks/
ADD README.md               /usr/app/
ADD .babelrc                /usr/app/
ADD server.js               /usr/app/

RUN mkdir /etc/service/express
ADD etc/express.run.sh /etc/service/express/run

EXPOSE 80

WORKDIR /usr/app/

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
