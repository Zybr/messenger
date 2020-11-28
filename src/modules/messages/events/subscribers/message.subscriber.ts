import {
  Connection,
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from "typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";
import Message from "../../entities/message.entity";
import MessageCreatedEvent from "../events/message-created.event";

/** Message events subscriber */
@EventSubscriber()
export default class MessageSubscriber
  implements EntitySubscriberInterface<Message> {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    connection: Connection
  ) {
    connection.subscribers.push(this);
  }

  /** After model storing */
  public afterInsert(event: InsertEvent<Message>): void {
    this.eventEmitter.emit(
      MessageCreatedEvent.NAME,
      new MessageCreatedEvent(event.entity)
    );
  }
}
