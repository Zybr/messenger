import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import MessagesServiceFilter from "./messages.service-filter";
import MessagesService from "./messages.service";
import Message from "../entities/message.entity";

describe("MessagesServiceFilter", () => {
  let service: MessagesServiceFilter;
  let executeSpy;
  const queryBuilder = {
    select: () => queryBuilder,
    andWhere: () => queryBuilder,
    orderBy: () => queryBuilder,
    limit: () => queryBuilder,
    execute: () => Promise.resolve([]),
  };

  beforeEach(async () => {
    const repositoryToken = getRepositoryToken(Message);
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<MessagesServiceFilter>(MessagesServiceFilter);
  });

  test("Built", () => {
    expect(service).toBeDefined();
  });

  describe(".setRecipient()", () => {
    let andWhereSpy;

    beforeEach(() => {
      jest.resetAllMocks();
      executeSpy = jest.spyOn(queryBuilder, "execute");
      andWhereSpy = jest.spyOn(queryBuilder, "andWhere");
    });

    test("Don't filter by recipient", async () => {
      await service.findAll();
      expect(andWhereSpy).not.toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalled();
    });

    test("Filter by recipient", async () => {
      const recipient = 1;

      expect(service.setRecipient(recipient)).toEqual(service);
      expect(await service.findAll()).toEqual(await queryBuilder.execute());
      expect(andWhereSpy).toHaveBeenCalledWith("recipient = :recipient", {
        recipient,
      });
      expect(executeSpy).toHaveBeenCalled();
    });
  });

  describe(".setSort()", () => {
    let orderBySpy;

    beforeEach(() => {
      jest.resetAllMocks();
      executeSpy = jest.spyOn(queryBuilder, "execute");
      orderBySpy = jest.spyOn(queryBuilder, "orderBy");
    });

    test("Don't sort", async () => {
      await service.findAll();
      expect(orderBySpy).not.toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalled();
    });

    test("Sort by field with default order", async () => {
      const sortDto = {
        attribute: "field",
        order: "desc",
      };

      expect(
        service.setSort({
          ...sortDto,
          ...{ order: null },
        })
      ).toEqual(service);
      expect(await service.findAll()).toEqual(await queryBuilder.execute());
      expect(orderBySpy).toHaveBeenCalledWith(sortDto.attribute, "ASC");
      expect(executeSpy).toHaveBeenCalled();
    });

    test("Sort by field with specific order", async () => {
      const sortDto = {
        attribute: "field",
        order: "desc",
      };

      expect(service.setSort(sortDto)).toEqual(service);
      expect(await service.findAll()).toEqual(await queryBuilder.execute());
      expect(orderBySpy).toHaveBeenCalledWith(
        sortDto.attribute,
        sortDto.order.toUpperCase()
      );
      expect(executeSpy).toHaveBeenCalled();
    });
  });

  describe(".setPagination()", () => {
    let limitSpy;

    beforeEach(() => {
      jest.resetAllMocks();
      executeSpy = jest.spyOn(queryBuilder, "execute");
      limitSpy = jest.spyOn(queryBuilder, "limit");
    });

    test("Don't limit result", async () => {
      await service.findAll();
      expect(limitSpy).not.toHaveBeenCalled();
      expect(executeSpy).toHaveBeenCalled();
    });

    test("Limit result", async () => {
      expect(
        service.setPagination({
          size: 10,
        })
      ).toEqual(service);
      expect(await service.findAll()).toEqual(await queryBuilder.execute());
      expect(limitSpy).toHaveBeenCalledWith(10);
      expect(executeSpy).toHaveBeenCalled();
    });
  });
});
