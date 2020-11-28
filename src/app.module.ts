import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventEmitterModule } from "@nestjs/event-emitter";
import MessagesGateway from "./modules/messages/getaways/messages.gateway";
import MessagesModule from "./modules/messages/messages.module";
import AppController from "./app.controller";

@Module({
  imports: [
    MessagesModule,
    TypeOrmModule.forRoot(),
    EventEmitterModule.forRoot({
      global: true,
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: ".",
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
  ],
  controllers: [AppController],
  providers: [MessagesGateway],
})
export default class AppModule {}
