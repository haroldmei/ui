FROM node:latest
ENV NODE_ENV "production"
ENV PORT 3000
EXPOSE 3000
RUN addgroup mygroup && adduser --disabled-password --ingroup mygroup myuser && mkdir -p /usr/src/app && chown -R myuser /usr/src/app

# Prepare app directory
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN chown myuser /usr/src/app/yarn.lock

USER myuser
RUN yarn install

COPY . /usr/src/app

# Start the app
USER root
CMD ["/usr/local/bin/npm", "run", "start:prod"]
