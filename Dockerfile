# ENV REACT_APP_ENV=${APP_ENV}
FROM node:12.2.0-alpine as react-build
WORKDIR /app
COPY ["package*", "./"]
RUN npm install
COPY . ./

RUN ls -a
ARG APP_ENV=development
#RUN npm run build:${APP_ENV}
#RUN cat .env.production
RUN npm run build:${APP_ENV}
RUN ls -a

FROM nginx:1.17.3-alpine
COPY --from=react-build /app/build /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#docker image build --build-arg APP_ENV=production -t simple-build .

#docker container run -p 3030:80 simple-build
#docker image build -t simple-build .