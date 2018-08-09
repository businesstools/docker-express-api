FROM phusion/baseimage:0.10.1
CMD ["/sbin/my_init"]
EXPOSE 80
RUN (curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -) && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    (curl -sL https://deb.nodesource.com/setup_10.x | bash -) && \
    DEBIAN_FRONTEND=noninteractive \
      apt-get install --no-install-recommends -yq nodejs yarn python build-essential && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    yarn global add node-gyp
