import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import MessagesModule from "../../src/messages/messages.module";
import MessagesService from "../../src/messages/services/messages.service";
import Message from "../../src/messages/entities/message.entity";

describe("Messages", () => {
  let app: INestApplication;
  const message = new Message();
  const createDto = {
    sender: 1,
    recipient: 2,
    text: "Text",
  };

  const messageService = {
    create: () => Promise.resolve(message),
    findAll: () => Promise.resolve([message, message]),
    findOne: () => Promise.resolve(message),
    update: () => Promise.resolve(message),
    remove: () => Promise.resolve({}),
  };
  const repositoryToken = getRepositoryToken(Message);

  beforeEach(() => {
    jest.resetAllMocks();

    jest
      .spyOn(messageService, "create")
      .mockReturnValue(Promise.resolve(message));
    jest
      .spyOn(messageService, "findAll")
      .mockReturnValue(Promise.resolve([message, message]));
    jest
      .spyOn(messageService, "findOne")
      .mockReturnValue(Promise.resolve(message));
    jest
      .spyOn(messageService, "update")
      .mockReturnValue(Promise.resolve(message));
    jest.spyOn(messageService, "remove").mockReturnValue(Promise.resolve({}));
  });

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

  it(`/messages   [GET]`, async () =>
    request(app.getHttpServer())
      .get("/messages")
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(await messageService.findAll())));

  describe("/messages/:id   [GET]", () => {
    it(`Success`, async () =>
      request(app.getHttpServer())
        .get("/messages/1")
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(await messageService.findOne())));

    it(`Not found`, async () => {
      jest
        .spyOn(messageService, "findOne")
        .mockReturnValue(Promise.resolve(null));

      await request(app.getHttpServer())
        .get("/messages/1")
        .expect(HttpStatus.NOT_FOUND)
        .expect(/not found/);
    });
  });

  describe(`/messages   [POST]`, () => {
    it(`Success`, async () =>
      request(app.getHttpServer())
        .post("/messages")
        .send(createDto)
        .expect(HttpStatus.CREATED)
        .expect(JSON.stringify(await messageService.create())));

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
    it(`Success`, async () =>
      request(app.getHttpServer())
        .put("/messages/1")
        .send({})
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(await messageService.update())));

    it(`Not found`, async () => {
      jest
        .spyOn(messageService, "findOne")
        .mockReturnValue(Promise.resolve(null));

      await request(app.getHttpServer())
        .put("/messages/1")
        .expect(HttpStatus.NOT_FOUND)
        .expect(/not found/);
    });

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

  it(`/messages/:id   [DELETE]`, async () =>
    request(app.getHttpServer())
      .put("/messages/1")
      .expect(HttpStatus.OK)
      .expect(JSON.stringify(await messageService.remove())));

  afterAll(async () => {
    await app.close();
  });
});
