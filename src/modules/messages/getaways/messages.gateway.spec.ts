import { Test, TestingModule } from "@nestjs/testing";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Socket } from "socket.io";
import MessagesGateway from "./messages.gateway";

describe("MessagesGateway", () => {
  let gateway: MessagesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesGateway,
        {
          provide: EventEmitter2,
          useValue: {
            on: () => undefined,
          },
        },
      ],
    }).compile();

    gateway = module.get<MessagesGateway>(MessagesGateway);
  });

  test("Build", () => {
    expect(gateway).toBeDefined();
  });

  test("handleSubscribe", () => {
    expect(gateway.handleSubscribe({ recipient: 1 }, {} as Socket)).toEqual({
      message: "Subscription established",
    });
  });
});
