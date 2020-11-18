import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import AppController from "../src/app.controller";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test("/   [GET]", () =>
    request(app.getHttpServer()).get("/").expect(HttpStatus.OK));
});
