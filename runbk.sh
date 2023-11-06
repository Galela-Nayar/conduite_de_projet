# Start the backend
cd cp
mvn clean install & mvn install
mvn spring-boot:run &


# Wait for all background processes to finish
wait