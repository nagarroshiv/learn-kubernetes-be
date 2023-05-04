FROM node:16.20.0

RUN mkdir -p /home/app
WORKDIR /home/app

COPY . /home/app/
RUN npm install

EXPOSE 3001

CMD ["npm", "start"]