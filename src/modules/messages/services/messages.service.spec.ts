import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import { getRepositoryToken } from "@nestjs/typeorm";
import MessagesService from "./messages.service";
import Message from "../entities/message.entity";
import MessagesController from "../controllers/messages/messages.controller";
import Factory from "../messages.mock-factory";
import MessagesServiceFilter from "./messages.service-filter";

describe("MessagesService", () => {
  let service: MessagesService;
  let repository: Repository<Message>;

  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(Message);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        MessagesService,
        MessagesServiceFilter,
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
      const saveMethod = jest
        .spyOn(repository, "save")
        .mockResolvedValue(message);

      expect(await service.create(dto)).toEqual(message);
      expect(saveMethod).toHaveBeenCalledWith(dto);
    });
  });

  describe(".findAll()", () => {
    test("Fetch by repository", async () => {
      const messages = [Factory.makeMessage()];
      const findAllMethod = jest
        .spyOn(repository, "find")
        .mockResolvedValue(messages);

      expect(await service.findAll()).toEqual(messages);
      expect(findAllMethod).toHaveBeenCalled();
    });
  });

  describe(".findOne()", () => {
    test("Fetch by repository", async () => {
      const message = Factory.makeMessage();
      const findOneMethod = jest
        .spyOn(repository, "findOne")
        .mockResolvedValue(message);

      expect(await service.findOne(message.id)).toEqual(message);
      expect(findOneMethod).toHaveBeenCalledWith(message.id);
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
          MessagesServiceFilter,
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
      const deleteMethod = jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 1 } as DeleteResult);

      expect(await service.remove(message.id)).toEqual(true);
      expect(deleteMethod).toHaveBeenCalledWith(message.id);
    });

    test("Records haven't been deleted", async () => {
      const deleteMethod = jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 0 } as DeleteResult);

      expect(await service.remove(message.id)).toEqual(false);
      expect(deleteMethod).toHaveBeenCalledWith(message.id);
    });
  });

  test(".getFilter", () => {
    expect(service.getFilter()).toBeInstanceOf(MessagesServiceFilter);
  });
});
