FROM node:21-alpine

RUN npm install -g yarn

WORKDIR /src

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 4000

ENV PORT=4000 
ENV JWT_PASS=mySecretPass@20 
ENV MONGO_URI=mongodb+srv://admin:ecommerce@mycluster.i0sa4mf.mongodb.net/waste-expert?retryWrites=true&w=majority
ENV USER=infomailerapp@gmail.com
ENV PASS=twybvdteggphtsxk
ENV NODE_ENV=development


CMD [ "yarn", "start"]