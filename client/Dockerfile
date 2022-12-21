FROM node:hydrogen-alpine3.17
WORKDIR /client
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install --legacy-peer-deps;\
    else npm install --omit=dev; \
    fi
COPY . .

CMD ["npm start"]