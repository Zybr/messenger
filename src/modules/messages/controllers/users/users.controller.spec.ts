import { Test, TestingModule } from "@nestjs/testing";
import UsersController from "./users.controller";
import MessagesService from "../../services/messages.service";
import MessagesServiceFilter from "../../services/messages.service-filter";
import GetMessagesDto from "../../dtos/get-messages.dto";

describe("UsersController", () => {
  let controller: UsersController;
  const filter = ({
    setRecipient: () => filter,
    setPagination: () => filter,
    setSort: () => filter,
    findAll: () => Promise.resolve([]),
  } as unknown) as MessagesServiceFilter;
  const messageService = ({
    getFilter: () => filter,
  } as unknown) as MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: MessagesService,
          useValue: messageService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  test("Built", () => {
    expect(controller).toBeDefined();
  });

  describe(".findAll()", () => {
    test("Uses service", async () => {
      const user = 1;
      const filterParams = {
        sort: {
          attribute: "created_at",
          order: "desc",
        },
        pagination: { size: 5 },
      } as GetMessagesDto;

      const setRecipientMethod = jest.spyOn(filter, "setRecipient");
      const setPaginationMethod = jest.spyOn(filter, "setPagination");
      const setSortMethod = jest.spyOn(filter, "setSort");
      const findAllMethod = jest
        .spyOn(filter, "findAll")
        .mockReturnValue(filter.findAll());

      controller.findAll(user, filterParams);
      expect(setRecipientMethod).toHaveBeenCalledWith(user);
      expect(setPaginationMethod).toHaveBeenCalledWith(filterParams.pagination);
      expect(setSortMethod).toHaveBeenCalledWith(filterParams.sort);
      expect(findAllMethod).toHaveBeenCalled();
      expect(await controller.findAll(user, {})).toEqual(
        await filter.findAll()
      );
    });
  });
});
