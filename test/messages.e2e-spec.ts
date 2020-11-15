import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import MessagesModule from "../src/messages/messages.module";
import MessagesService from "../src/messages/messages.service";
import Message from "../src/messages/entities/message.entity";

describe("Messages", () => {
  let app: INestApplication;
  const message = new Message();
  const createDto = {
    sender: 1,
    recipient: 2,
    text: "Text",
  };

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
    app.useGlobalPipes(new ValidationPipe());
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

  describe(`/messages   [POST]`, () => {
    it(`Success`, () =>
      request(app.getHttpServer())
        .post("/messages")
        .send(createDto)
        .expect(HttpStatus.CREATED)
        .expect(JSON.stringify(messageService.create())));

    describe("Bad request", () => {
      [
        {
          title: `"sender": NULL`,
          params: { sender: null },
        },
        {
          title: `"recipient": NULL`,
          params: { recipient: null },
        },
        {
          title: `"text": NULL`,
          params: { text: null },
        },
        {
          title: `"text": empty string`,
          params: { text: "" },
        },
        {
          title: `"sender": object (invalid type)`,
          params: { sender: {} },
        },
        {
          title: `"recipient": object (invalid type)`,
          params: { recipient: {} },
        },
        {
          title: `"text": object (invalid type)`,
          params: { text: {} },
        },
      ].forEach((params) => {
        it(`${params.title}`, () =>
          request(app.getHttpServer())
            .post("/messages")
            .send({
              ...createDto,
              ...params.params,
            })
            .expect(HttpStatus.BAD_REQUEST));
      });
    });
  });

  describe(`/messages/:id   [PUT]`, () => {
    it(`Success`, () =>
      request(app.getHttpServer())
        .put("/messages/1")
        .send({})
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(messageService.update())));

    describe("Bad request", () => {
      [
        {
          title: `"text": NULL`,
          params: { text: null },
        },
        {
          title: `"text": empty string`,
          params: { text: "" },
        },
        {
          title: `"text": object (invalid type)`,
          params: { text: {} },
        },
      ].forEach((params) => {
        it(`${params.title}`, () =>
          request(app.getHttpServer())
            .post("/messages")
            .send({
              ...createDto,
              ...params.params,
            })
            .expect(HttpStatus.BAD_REQUEST));
      });
    });
  });

  it(`/messages/:id   [DELETE]`, () =>
    request(app.getHttpServer())
      .put("/messages/1")
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(messageService.remove())));

  afterAll(async () => {
    await app.close();
  });
});
