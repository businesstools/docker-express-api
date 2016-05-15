FROM jedisct1/phusion-baseimage-latest
MAINTAINER Daniel Haus <daniel.haus@businesstools.de>

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -yq nodejs

ADD package.json /tmp/package.json
RUN cd /tmp && npm install && npm cache clean
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app/

ADD package.json            /usr/app/
ADD tools/                  /usr/app/tools/
ADD README.md               /usr/app/
ADD .babelrc                /usr/app/
ADD server.js               /usr/app/

RUN mkdir /etc/service/express
ADD etc/express.run.sh /etc/service/express/run

EXPOSE 80

WORKDIR /usr/app/

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
