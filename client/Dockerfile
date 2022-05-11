# pull official base image
FROM node:17-alpine

# set working directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm ci
RUN npm install react-scripts@5.0.0 -g --silent

COPY ./media/ ./media/
COPY ./static/ ./static/
COPY ./public/ ./public/
COPY ./src/ ./src/

# start app
CMD ["npm", "start"]
