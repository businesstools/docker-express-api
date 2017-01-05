FROM jedisct1/phusion-baseimage-latest
MAINTAINER Daniel Haus <daniel.haus@businesstools.de>

# Fix npm inside docker image
# see https://github.com/npm/npm/issues/9863

# Circumvent missing package problem ("nan") with node-gyp
# https://github.com/ncb000gt/node.bcrypt.js/issues/428

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    (curl -sL https://deb.nodesource.com/setup_6.x | bash -) && \
    apt-get install -yq nodejs python build-essential && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    cd $(npm root -g)/npm \
    && npm install fs-extra \
    && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js && \
    cd $(npm root -g)/npm && \
    npm install nan && \
    npm install -g node-gyp yarn

ADD package.json /tmp/package.json
RUN cd /tmp && npm install && npm cache clean && \
    mkdir -p /usr/app && mv /tmp/node_modules /usr/app/

ADD package.json            /usr/app/
ADD tasks/                  /usr/app/tasks/
ADD README.md               /usr/app/
ADD .babelrc                /usr/app/
ADD server.js               /usr/app/

RUN mkdir /etc/service/express
ADD etc/express.run.sh /etc/service/express/run

EXPOSE 80

WORKDIR /usr/app/
