FROM node:hydrogen-alpine3.17
WORKDIR /server
COPY package.json .
# run a bash script to install only those dependencies 
# that are required specifically in development/production
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install --legacy-peer-deps;\
    else npm install --omit=dev; \
    fi
COPY . .
# specify env variables
ENV PORT=5000
EXPOSE $PORT

CMD [ "npm run dev:server" ]