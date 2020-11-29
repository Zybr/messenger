import { NotFoundException } from "@nestjs/common";
import MessageByIdPipe from "./message-by-id.pipe";
import MessagesService from "../services/messages.service";
import Message from "../entities/message.entity";

describe("MessageByIdPipe", () => {
  const message = new Message();
  message.sender = 2;
  const messageService = ({
    findOne: () => Promise.resolve({}),
  } as unknown) as MessagesService;
  let pipe: MessageByIdPipe;

  beforeEach(() => {
    pipe = new MessageByIdPipe(messageService);
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(new MessageByIdPipe(messageService)).toBeDefined();
  });

  describe("Message is defined.", () => {
    it(`Not-found exception.`, async () => {
      const methodFindOne = jest
        .spyOn(messageService, "findOne")
        .mockReturnValue(Promise.resolve(message));

      expect(await pipe.transform("1")).toEqual(message);
      expect(methodFindOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Message is not defined. Get "not-found" exception.', () => {
    [
      {
        title: "NULL",
        isUsingRepository: false,
        value: null,
      },
      {
        title: "UNDEFINED",
        isUsingRepository: false,
        value: undefined,
      },
      {
        title: "[not-number]",
        isUsingRepository: false,
        value: "string",
      },
      {
        title: "[not-exist]",
        isUsingRepository: true,
        value: "22",
      },
    ].forEach((params) => {
      const { title, value, isUsingRepository } = params;

      it(`Not-found exception. ${title}`, async () => {
        const methodFindOne = jest
          .spyOn(messageService, "findOne")
          .mockReturnValue(Promise.resolve(null));

        await expect(pipe.transform(value)).rejects.toBeInstanceOf(
          NotFoundException
        );

        expect(methodFindOne).toHaveReturnedTimes(isUsingRepository ? 1 : 0);
      });
    });
  });
});
