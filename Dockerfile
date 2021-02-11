FROM node:alpine
LABEL maintainer="https://github.com/gaurav-nelson" 

# Use the Open Container Image Annotation Spec (https://github.com/opencontainers/image-spec/blob/master/annotations.md)
LABEL org.opencontainers.image.title="asciidoc-link-check"
LABEL org.opencontainers.image.description="Checks if all hyperlinks in an asciidoc file are alive(or dead)."
LABEL org.opencontainers.image.documentation="https://github.com/gaurav-nelson/asciidoc-link-check/blob/master/README.md"
LABEL org.opencontainers.image.source="https://github.com/gaurav-nelson/asciidoc-link-check"

# Install app dependencies
COPY package.json /src/
WORKDIR /src
RUN set -ex; \
    npm install
# Bundle app source
COPY . /src
ENTRYPOINT [ "/src/asciidoc-link-check" ]
