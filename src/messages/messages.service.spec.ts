import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { getRepositoryToken } from "@nestjs/typeorm";
import MessagesService from "./messages.service";
import Message from "./entities/message.entity";
import MessagesController from "./messages.controller";
import Factory from "./messages.mock-factory";

describe("MessagesService", () => {
  let service: MessagesService;
  let repository: Repository<Message>;

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

  test("Built", () => {
    expect(service).toBeDefined();
  });

  describe(".create()", () => {
    test("Uses repository", async () => {
      const dto = Factory.makeCreateMessageDto();
      const message = {
        ...Factory.makeMessage(),
        ...dto,
      };
      const methodSpy = jest
        .spyOn(repository, "save")
        .mockResolvedValue(message);

      expect(await service.create(dto)).toEqual(message);
      expect(methodSpy).toHaveBeenCalledWith(dto);
    });
  });

  describe(".findAll()", () => {
    test("Fetch by repository", async () => {
      const messages = [Factory.makeMessage()];
      const methodSpy = jest
        .spyOn(repository, "find")
        .mockResolvedValue(messages);

      expect(await service.findAll()).toEqual(messages);
      expect(methodSpy).toHaveBeenCalled();
    });
  });

  describe(".findOne()", () => {
    test("Fetch by repository", async () => {
      const message = Factory.makeMessage();
      const methodSpy = jest
        .spyOn(repository, "findOne")
        .mockResolvedValue(message);

      expect(await service.findOne(message.id)).toEqual(message);
      expect(methodSpy).toHaveBeenCalledWith(message.id);
    });
  });

  describe(".update()", () => {
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

    test("Update by repository", async () => {
      const dto = Factory.makeUpdateMessageDto();
      const message = {
        ...Factory.makeMessage(),
        ...dto,
      };
      const updateMethod = jest.spyOn(queryBuilder, "update");
      const setMethod = jest.spyOn(queryBuilder, "set");
      jest.spyOn(executeResult, "then").mockResolvedValue(message);

      expect(await service.update(message.id, dto)).toEqual(message);
      expect(updateMethod).toHaveBeenCalled();
      expect(setMethod).toHaveBeenCalledWith(dto);
    });
  });

  describe(".remove()", () => {
    const message = Factory.makeMessage();

    test("Records have been deleted", async () => {
      const methodSpy = jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      expect(await service.remove(message.id)).toEqual(true);
      expect(methodSpy).toHaveBeenCalledWith(message.id);
    });

    test("Records haven't been deleted", async () => {
      const methodSpy = jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      expect(await service.remove(message.id)).toEqual(false);
      expect(methodSpy).toHaveBeenCalledWith(message.id);
    });
  });
});
