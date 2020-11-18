import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import MessagesModule from "./messages/messages.module";
import AppController from "./app.controller";

@Module({
  imports: [MessagesModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export default class AppModule {}
