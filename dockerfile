FROM node:14-alpine
ADD ./crontab.txt   /etc/crontabs/root
RUN crond -l 2
COPY . .
RUN npm i && node scripts/site-map.js && npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]