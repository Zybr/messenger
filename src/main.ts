import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import AppModule from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up API documentation
  const options = new DocumentBuilder()
    .setTitle("API Documentation")
    .setDescription("Message management")
    .setVersion("0.1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  // Enable validation of incoming data
  app.useGlobalPipes(new ValidationPipe());

  // Run
  await app.listen(app.get<ConfigService>(ConfigService).get("http.port"));
}
bootstrap();
