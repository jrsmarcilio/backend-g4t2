FROM node:14

WORKDIR /usr/src/app

COPY . .

COPY ["package.json", "yarn.lock", "./"]

RUN yarn && yarn build

COPY . .

EXPOSE 3000
CMD [ "node", "dist/server" ]
