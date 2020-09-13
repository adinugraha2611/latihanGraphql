# base image
FROM node:current-slim

# app directory inside the image
WORKDIR /usr/src/app

# copying papckage.json and package-lock.json
COPY package*.json ./

#install nodejs dependencies
RUN npm install

#copying all source codes (except the ones included in .dockerignore) from this local dir to this workdir
COPY . ./

EXPOSE 4000

# run the app
# jangan lupa! petiknya harus double quote(") ga bisa pake '
CMD ["npm", "start"]