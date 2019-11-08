FROM node:12.9.0-alpine
EXPOSE 5000
WORKDIR /app
COPY . /app
ENV NODE_ENV=production
COPY ./client/package.json /app/client/package.json
RUN npm install && npm run heroku-postbuild


COPY ./client/public /app/client/public

CMD ["npm", "start"]
