import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Socket } from "socket.io";
import MessagesGateway from "./messages.gateway";
import MessageCreatedEvent from "../events/events/message-created.event";
import Factory from "../messages.mock-factory";

describe("MessagesGateway", () => {
  let gateway: MessagesGateway;
  let eventEmitter: EventEmitter2;
  const recipient = 1;
  const socket = ({
    emit: () => undefined,
  } as unknown) as Socket;
  const message = Factory.makeMessage({ recipient });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesGateway, EventEmitter2],
    }).compile();

    gateway = module.get<MessagesGateway>(MessagesGateway);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  test("Build", () => expect(gateway).toBeDefined());

  test(".handleSubscribe()", () => {
    expect(gateway.handleSubscribe({ recipient }, socket)).toEqual({
      message: "Subscription established",
    });
  });

  describe(`Event: "${MessageCreatedEvent.NAME}"`, () => {
    let socketEmitMethod;
    let event;

    beforeEach(() => {
      jest.resetAllMocks();
      socketEmitMethod = jest.spyOn(socket, "emit");
      event = new MessageCreatedEvent(message);
    });

    test("Receive message you are subscribed to", () => {
      gateway.handleSubscribe({ recipient }, socket);
      eventEmitter.emit(MessageCreatedEvent.NAME, event);

      expect(socketEmitMethod).toHaveBeenCalledWith(
        MessageCreatedEvent.NAME,
        event
      );
    });

    test("Don't receive alien messages", () => {
      gateway.handleSubscribe({ recipient: recipient + 1 }, socket);
      eventEmitter.emit(MessageCreatedEvent.NAME, event);

      expect(socketEmitMethod).toHaveBeenCalledTimes(0);
    });
  });
});
