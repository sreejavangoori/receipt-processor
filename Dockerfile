FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Copy app source
COPY . .

# Install app dependencies
RUN npm install

# Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]