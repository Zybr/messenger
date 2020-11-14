import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import MessagesModule from "../src/messages/messages.module";
import MessagesService from "../src/messages/messages.service";
import Message from "../src/messages/entities/message.entity";

describe("Messages", () => {
  let app: INestApplication;
  const message = new Message();
  const messageService = {
    create: () => message,
    findAll: () => [message, message],
    findOne: () => message,
    update: () => message,
    remove: () => ({}),
  };
  const repositoryToken = getRepositoryToken(Message);

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MessagesModule],
    })
      .overrideProvider(repositoryToken)
      .useValue({})
      .overrideProvider(MessagesService)
      .useValue(messageService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/messages   [GET]`, () =>
    request(app.getHttpServer())
      .get("/messages")
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(messageService.findAll())));

  it(`/messages/:id   [GET]`, () =>
    request(app.getHttpServer())
      .get("/messages/1")
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(messageService.findOne())));

  it(`/messages   [POST]`, () =>
    request(app.getHttpServer())
      .post("/messages")
      .expect(HttpStatus.CREATED)
      .expect(JSON.stringify(messageService.create())));

  it(`/messages/:id   [PUT]`, () =>
    request(app.getHttpServer())
      .put("/messages/1")
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(messageService.update())));

  it(`/messages/:id   [DELETE]`, () =>
    request(app.getHttpServer())
      .put("/messages/1")
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(messageService.remove())));

  afterAll(async () => {
    await app.close();
  });
});
