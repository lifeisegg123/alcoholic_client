FROM node:14-alpine
COPY . .
RUN npm i && node scripts/site-map.js && npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]