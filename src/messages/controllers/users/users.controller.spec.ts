import { Test, TestingModule } from "@nestjs/testing";
import UsersController from "./users.controller";
import MessagesService from "../../services/messages.service";

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: MessagesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  test("Built", () => {
    expect(controller).toBeDefined();
  });
});
