FROM node:latest
LABEL maintainer="https://github.com/gaurav-nelson" 

# Install app dependencies
COPY package.json /src/package.json
WORKDIR /src
RUN set -ex; \
    npm install \
    && npm ls
# Bundle app source
COPY . /src
ENTRYPOINT [ "/src/asciidoc-link-check" ]