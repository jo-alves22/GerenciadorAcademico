# Estágio 1: compilação com Maven + Java 17
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Estágio 2: imagem final apenas com o JAR
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/gerenciador-academico-0.0.1-SNAPSHOT.jar ./gerenciador-academico-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./gerenciador-academico-0.0.1-SNAPSHOT.jar"]
