import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import MessagesModule from "./messages/messages.module";
import AppController from "./app.controller";
import AppService from "./app.service";

@Module({
  imports: [MessagesModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
