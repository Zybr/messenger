import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import MessagesFilter from "./services/messages.filter";
import UsersController from "./controllers/users/users.controller";
import MessagesService from "./services/messages.service";
import MessagesController from "./controllers/messages/messages.controller";
import Message from "./entities/message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController, UsersController],
  providers: [MessagesService, MessagesFilter],
})
export default class MessagesModule {}
