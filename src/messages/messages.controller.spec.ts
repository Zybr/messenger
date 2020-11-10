import { Test, TestingModule } from "@nestjs/testing";
import MessagesController from "./messages.controller";
import MessagesService from "./messages.service";

// TODO: Rewrite
describe("MessagesController", () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [MessagesService],
    }).compile();
    controller = module.get<MessagesController>(MessagesController);
  });

  it.skip("should be defined", () => {
    expect(controller).toBeUndefined();
  });
});
