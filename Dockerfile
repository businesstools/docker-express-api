FROM jedisct1/phusion-baseimage-latest
MAINTAINER Daniel Haus <daniel.haus@businesstools.de>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && \
    apt-get install -yq \
        nodejs npm

RUN ln -s /usr/bin/nodejs /usr/bin/node

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app/

ADD package.json /usr/app/package.json
ADD .babelrc /usr/app/.babelrc

RUN mkdir /etc/service/express
ADD etc/express.run.sh /etc/service/express/run

EXPOSE 80

WORKDIR /usr/app/

ONBUILD ADD package.json /usr/app/
ONBUILD RUN npm install

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
