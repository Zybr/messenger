import { Test, TestingModule } from "@nestjs/testing";
import AppController from "./app.controller";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();
  });

  describe(".getInfo", () => {
    it("Show short info", () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getInfo()).toHaveProperty("version");
    });
  });
});
