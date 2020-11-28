import { EventEmitter2 } from "@nestjs/event-emitter";
import { Connection, InsertEvent } from "typeorm";
import MessageSubscriber from "./message.subscriber";
import Message from "../../entities/message.entity";
import MessageCreatedEvent from "../events/message-created.event";

describe("MessageSubscriber", () => {
  let subscriber: MessageSubscriber;
  const subscribers = {
    push: () => undefined,
  };
  const eventEmitter = ({
    emit: () => undefined,
  } as unknown) as EventEmitter2;
  const connection = ({ subscribers } as unknown) as Connection;
  const insertEvent = {
    entity: { id: 1 },
  } as InsertEvent<Message>;
  const pushMethod = jest.spyOn(subscribers, "push");

  beforeEach(async () => {
    subscriber = new MessageSubscriber(eventEmitter, connection);
  });

  test("Built", () => {
    expect(subscriber).toBeDefined();
    expect(pushMethod).toHaveBeenCalledWith(subscriber);
  });

  it("handleSubscribe", () => {
    const emitMethod = jest.spyOn(eventEmitter, "emit");
    subscriber.afterInsert(insertEvent);
    expect(emitMethod).toHaveBeenCalledWith(
      MessageCreatedEvent.NAME,
      new MessageCreatedEvent(insertEvent.entity)
    );
  });
});
