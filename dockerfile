
FROM node:alpine

RUN mkdir -p /opt/app
WORKDIR /opt
COPY package.json package-lock.json* ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . ./opt/app

EXPOSE 3000
CMD npm run dev