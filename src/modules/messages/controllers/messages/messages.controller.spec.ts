import { Test, TestingModule } from "@nestjs/testing";
import MessagesController from "./messages.controller";
import MessagesService from "../../services/messages.service";
import Factory from "../../messages.mock-factory";

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
    test("Fetch by service", async () => {
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
      expect(await controller.findOne(Promise.resolve(model))).toEqual(model);
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

      expect(await controller.update(Promise.resolve(model), dto)).toEqual(
        model
      );
      expect(updateMethod).toHaveBeenCalled();
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
