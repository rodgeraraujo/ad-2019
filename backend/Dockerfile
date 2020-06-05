FROM node:13.8-alpine

ENV NODE_ENV development

WORKDIR /www/ad2019

COPY package.json /www/ad2019
COPY yarn.lock /www/ad2019
COPY .env.development /www/ad2019/.env

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
