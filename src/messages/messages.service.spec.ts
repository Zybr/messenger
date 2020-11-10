import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import * as moment from "moment";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as faker from "faker";
import MessagesService from "./messages.service";
import Message from "./entities/message.entity";
import MessagesController from "./messages.controller";
import CreateMessageDto from "./dto/create-message.dto";
import UpdateMessageDto from "./dto/update-message.dto";

describe("MessagesService", () => {
  let service: MessagesService;
  let repository: Repository<Message>;

  const makeMessage = (): Message => ({
    id: faker.random.number(),
    sender: faker.random.number(),
    recipient: faker.random.number(),
    text: faker.lorem.words(),
    created_at: moment(),
    updated_at: moment(),
  });

  const makeCreateMessageDto = (): CreateMessageDto => {
    const { sender, recipient, text } = makeMessage();

    return { sender, recipient, text };
  };

  const makeUpdateMessageDto = (): UpdateMessageDto => {
    const { text } = makeMessage();

    return { text };
  };

  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(Message);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        MessagesService,
        {
          provide: repositoryToken,
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    repository = module.get<Repository<Message>>(repositoryToken);
  });

  it("service is defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("use repository", async () => {
      const dto = makeCreateMessageDto();
      const message = {
        ...makeMessage(),
        ...dto,
      };
      const methodSpy = jest
          .spyOn(repository, "save")
          .mockResolvedValue(message);

      expect(await service.create(dto)).toEqual(message);
      expect(methodSpy).toHaveBeenCalledWith(dto);
    });
  });

  describe("findAll", () => {
    it("use repository", async () => {
      const messages = [makeMessage()];
      const methodSpy = jest
        .spyOn(repository, "find")
        .mockResolvedValue(messages);

      expect(await service.findAll()).toEqual(messages);
      expect(methodSpy).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("use repository", async () => {
      const message = makeMessage();
      const methodSpy = jest
        .spyOn(repository, "findOne")
        .mockResolvedValue(message);

      expect(await service.findOne(message.id)).toEqual(message);
      expect(methodSpy).toHaveBeenCalledWith(message.id);
    });
  });

  describe("update", () => {
    let queryBuilder;
    let executeResult;

    beforeEach(async () => {
      const repositoryToken = getRepositoryToken(Message);
      executeResult = {
        then: () => null,
      };
      queryBuilder = {
        update: () => queryBuilder,
        set: () => queryBuilder,
        where: () => queryBuilder,
        execute: () => executeResult,
      };
      const module: TestingModule = await Test.createTestingModule({
        controllers: [MessagesController],
        providers: [
          MessagesService,
          {
            provide: repositoryToken,
            useFactory: () => ({
              createQueryBuilder: () => queryBuilder,
            }),
          },
        ],
      }).compile();

      service = module.get<MessagesService>(MessagesService);
      repository = module.get<Repository<Message>>(repositoryToken);
    });

    it("use repository", async () => {
      const dto = makeUpdateMessageDto();
      const message = {
        ...makeMessage(),
        ...dto,
      };
      jest.spyOn(executeResult, "then").mockResolvedValue(message);

      expect(await service.update(message.id, dto)).toEqual(message);
    });
  });


  describe("remove", () => {
    const message = makeMessage();

    it("records have been deleted", async () => {
      const methodSpy = jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      expect(await service.remove(message.id)).toEqual(true);
      expect(methodSpy).toHaveBeenCalledWith(message.id);
    });

    it("records haven't been deleted", async () => {
      const methodSpy = jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      expect(await service.remove(message.id)).toEqual(false);
      expect(methodSpy).toHaveBeenCalledWith(message.id);
    });
  });
});
