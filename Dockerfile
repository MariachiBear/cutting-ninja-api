# Lightest nodejs docker image
FROM node:lts-alpine

# Default port
EXPOSE 3000

# Non-root user for security purposes.
#
# UIDs below 10,000 are a security risk, as a container breakout could result
# in the container being ran as a more privileged user on the host kernel with
# the same UID.
#
# Static GID/UID is also useful for chown'ing files outside the container where
# such a user does not exist.
RUN addgroup -g 10001 -S nonroot && adduser -u 10000 -S -G nonroot -h /home/nonroot nonroot

# Packages update
RUN apk add --no-cache

# Create app directory
WORKDIR /home/nonroot/url-shortener

# Install PNPM
RUN npm install -g pnpm

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Bundle app source
COPY . .

# Build application
RUN pnpm build

# Use the non-root user to run our application
USER nonroot

# Default npm command to run
ENTRYPOINT ["pnpm"]

# Arguments to run with the command at the entrypoint
CMD ["start:prod"]


# BUILD : docker build -t <username>/<rep-name>:tag .
# RUN : docker run -it -d -p <host-port>:3000 --name <container-name> <username>/<rep-name>:tag