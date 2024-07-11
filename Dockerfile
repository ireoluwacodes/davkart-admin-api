FROM node:21-alpine

RUN rm -f /usr/local/bin/yarnpkg && \
    rm -f /usr/local/bin/yarn && \
    npm install -g yarn

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD [ "yarn", "start"]