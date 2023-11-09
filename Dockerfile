FROM ubuntu:22.04


# Install NodeJS
# Update and install required packages
RUN apt-get update && apt-get install -y ca-certificates curl gnupg lsb-release
RUN curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor -o /etc/apt/trusted.gpg.d/nodesource.gpg
RUN NODE_MAJOR=20 && \
    echo "deb [signed-by=/etc/apt/trusted.gpg.d/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install -y nodejs

# Update the package repository and install Java JDK and Maven
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get install -y maven


# Install MongoDB
RUN apt-get update && apt-get install -y gnupg curl
RUN curl -fsSL https://pgp.mongodb.com/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
RUN echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
RUN apt-get update && apt-get install -y mongodb-org jq
RUN mkdir -p /db && chown -R mongodb:mongodb /db


# Setup our front and back
WORKDIR /app/cp_frontend
COPY cp_frontend/package.json .
RUN npm install

WORKDIR /app/cp
COPY cp/pom.xml .
RUN mvn clean install && mvn install
COPY . .
WORKDIR /app/cp_frontend
COPY . .



# Copy start script
WORKDIR /app
COPY rundb.sh /rundb.sh
RUN chmod +x /rundb.sh
COPY runbk.sh /runbk.sh
RUN chmod +x /runbk.sh
COPY runfd.sh /runfd.sh
RUN chmod +x /runfd.sh

EXPOSE 8080

# Start the application
CMD ["/run.sh"]