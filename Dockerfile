FROM node:lts-slim

RUN useradd -ms /bin/bash nodeuser
USER nodeuser

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
