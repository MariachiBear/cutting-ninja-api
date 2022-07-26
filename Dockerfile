# Lightest nodejs docker image
FROM node:lts

# API production port
EXPOSE 3000

# Non-root user for security purposes.
#
# UIDs below 10,000 are a security risk, as a container breakout could result
# in the container being ran as a more privileged user on the host kernel with
# the same UID.
#
# Static GID/UID is also useful for chown'ing files outside the container where
# such a user does not exist.
RUN groupmod -g 10000 node && usermod -u 10000 -g 10000 node

# Change node user name to nonroot
RUN usermod -d /home/nonroot -l nonroot node

# Change npm global packages folder
ENV NPM_CONFIG_PREFIX=/home/nonroot/.npm-global
ENV PATH=$PATH:/home/nonroot/.npm-global/bin

# Create app directory
WORKDIR /home/nonroot/cutting-ninja

# Change PM2 log folder permissions
RUN mkdir /home/nonroot/.pm2 && chmod -R 777 /home/nonroot/.pm2

# Install PNPM
RUN npm install npm pnpm pm2 --location=global

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# A wildcard is used to ensure pnpm-lock.yaml copied
COPY pnpm*.yaml ./

# Install dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Build application
RUN pnpm run build

# Use the non-root user to run our application
USER nonroot

# Default npm command to run
ENTRYPOINT ["pnpm"]

# Arguments to run with the command at the entrypoint
CMD ["start:prod"]
