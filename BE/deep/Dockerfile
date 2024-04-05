FROM azul/zulu-openjdk:17
WORKDIR /spring
COPY ./build/libs/deep-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "server.jar"]
