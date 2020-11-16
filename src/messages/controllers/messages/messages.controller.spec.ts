import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import MessagesController from "./messages.controller";
import MessagesService from "../../services/messages.service";
import Factory from "../../services/messages.mock-factory";

describe("MessagesController", () => {
  let controller: MessagesController;
  const messageService = ({
    findAll: () => {},
    findOne: () => {},
    create: () => {},
    update: () => {},
    remove: () => {},
  } as unknown) as MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: messageService,
        },
      ],
    }).compile();
    controller = module.get<MessagesController>(MessagesController);

    jest.resetAllMocks();
  });

  test("Built", () => {
    expect(controller).toBeDefined();
  });

  describe(".findAll()", () => {
    test("Uses service", async () => {
      const models = [Factory.makeMessage()];
      const createMethod = jest
        .spyOn(messageService, "findAll")
        .mockReturnValue(Promise.all(models));

      expect(await controller.findAll()).toEqual(models);
      expect(createMethod).toHaveBeenCalled();
    });
  });

  describe(".findOne()", () => {
    const model = Factory.makeMessage();

    beforeEach(jest.resetAllMocks);

    test("Fetch by service", async () => {
      const createMethod = jest
        .spyOn(messageService, "findOne")
        .mockReturnValue(Promise.resolve(model));

      expect(await controller.findOne(model.id)).toEqual(model);
      expect(createMethod).toHaveBeenCalled();
      createMethod.mockClear();
      jest.clearAllMocks();
    });

    test("Not found", async () => {
      await expect(controller.findOne(model.id)).rejects.toBeInstanceOf(
        NotFoundException
      );
    });
  });

  describe(".create()", () => {
    test("Uses service", async () => {
      const dto = Factory.makeCreateMessageDto();
      const model = Factory.makeMessage();
      const createMethod = jest
        .spyOn(messageService, "create")
        .mockReturnValue(Promise.resolve(model));

      expect(await controller.create(dto)).toEqual(model);
      expect(createMethod).toHaveBeenCalled();
    });
  });

  describe(".update()", () => {
    const model = Factory.makeMessage();
    const dto = Factory.makeCreateMessageDto();

    beforeEach(jest.resetAllMocks);

    test("Update by service", async () => {
      const updateMethod = jest
        .spyOn(messageService, "update")
        .mockReturnValue(Promise.resolve(model));
      jest
        .spyOn(messageService, "findOne")
        .mockReturnValue(Promise.resolve(model));

      expect(await controller.update(model.id, dto)).toEqual(model);
      expect(updateMethod).toHaveBeenCalled();
    });

    test("Not found", async () => {
      await expect(controller.update(model.id, dto)).rejects.toBeInstanceOf(
        NotFoundException
      );
    });
  });

  describe(".remove()", () => {
    test("Remove by service", async () => {
      const model = Factory.makeMessage();
      const removeMethod = jest
        .spyOn(messageService, "remove")
        .mockReturnValue(Promise.resolve(true));

      expect(await controller.remove(model.id)).toBeUndefined();
      expect(removeMethod).toHaveBeenCalled();
    });
  });
});
