FROM jedisct1/phusion-baseimage-latest:16.04
MAINTAINER Daniel Haus <daniel.haus@businesstools.de>

# Fix npm inside docker image
# see https://github.com/npm/npm/issues/9863

# Circumvent missing package problem ("nan") with node-gyp
# https://github.com/ncb000gt/node.bcrypt.js/issues/428

ENV DEBIAN_FRONTEND noninteractive
RUN (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -) && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    (curl -sL https://deb.nodesource.com/setup_6.x | bash -) && \
    apt-get install -yq nodejs yarn python build-essential && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    yarn global add node-gyp

ADD package.json /tmp/package.json
RUN cd /tmp && yarn && yarn cache clean && \
    mkdir -p /usr/app && mv /tmp/node_modules /usr/app/

ADD package.json            /usr/app/
ADD tasks/                  /usr/app/tasks/
ADD README.md               /usr/app/
ADD .babelrc                /usr/app/
ADD server.js               /usr/app/

RUN mkdir /etc/service/express
ADD bin/express.run.sh /etc/service/express/run

EXPOSE 80

WORKDIR /usr/app/
