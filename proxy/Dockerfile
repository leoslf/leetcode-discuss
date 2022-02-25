# install dependencies
FROM node:alpine AS installation
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV YARN_CACHE_FOLDER /usr/src/app/.yarn

WORKDIR /usr/src/app
COPY package.json yarn.lock .yarnrc ./
RUN --mount=type=bind,source=./.yarn,target=/usr/src/app/.yarn,rw yarn install --prefer-offline --frozen-lockfile --production

# build
FROM node:alpine AS build
ENV YARN_CACHE_FOLDER /usr/src/app/.yarn

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc ./
RUN --mount=type=bind,source=./.yarn,target=/usr/src/app/.yarn,rw yarn install --prefer-offline --frozen-lockfile
COPY . .
RUN yarn build

# release
FROM node:alpine AS release
WORKDIR /usr/src/app

COPY --from=installation /usr/src/app/node_modules ./node_modules
COPY package.json ./
COPY --from=build /usr/src/app/dist ./dist
CMD npm start
