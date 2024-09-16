
# Stage 1: Build the React application
FROM node:lts AS build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# Stage 2: Serve the React application from Apache
FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
#RUN apt update ; apt install -y vim
#COPY ./.bashrc /root/



