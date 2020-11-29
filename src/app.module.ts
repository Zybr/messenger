import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ConfigModule, ConfigService } from "@nestjs/config";
import MessagesGateway from "./modules/messages/getaways/messages.gateway";
import MessagesModule from "./modules/messages/messages.module";
import AppController from "./app.controller";
import configuration from "../configs/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MessagesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get("database"),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [MessagesGateway],
})
export default class AppModule {}
