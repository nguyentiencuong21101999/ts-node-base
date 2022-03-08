FROM node:14.17-slim

ARG SERVICES_NAME=test
ARG VERSION
ARG PORT

# Create app directory
RUN mkdir /srv/${SERVICES_NAME}
WORKDIR /srv/${SERVICES_NAME}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY . ./
RUN rm -f Dockerfile

ENTRYPOINT node server.js
EXPOSE ${PORT}