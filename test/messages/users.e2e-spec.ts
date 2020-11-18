import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import MessagesModule from "../../src/messages/messages.module";
import MessagesService from "../../src/messages/services/messages.service";
import Message from "../../src/messages/entities/message.entity";
import MessagesFilter from "../../src/messages/services/messages.filter";

describe("Messages. Users.", () => {
  let app: INestApplication;

  const filter = ({
    setRecipient: () => filter,
    setPagination: () => filter,
    setSort: () => filter,
    findAll: () => Promise.resolve([]),
  } as unknown) as MessagesFilter;

  const messageService = ({
    getFilter: () => filter,
  } as unknown) as MessagesService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [MessagesModule],
    })
      .overrideProvider(getRepositoryToken(Message))
      .useValue({})
      .overrideProvider(MessagesService)
      .useValue(messageService)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe("/user/:id/messages   [GET]", () => {
    it("Success", async () =>
      request(app.getHttpServer())
        .get("/users/1/messages")
        .send({})
        .expect(HttpStatus.OK)
        .expect(JSON.stringify(await filter.findAll())));

    describe("Bad request", () => {
      [
        // TODO: Create pipe 'trim'
        {
          title: "sort->attribute: NULL",
          responseBody: /attribute/,
          params: {
            sort: {
              attribute: null,
            },
          },
        },
        {
          title: "sort->attribute: [ ]",
          responseBody: /attribute/,
          params: {
            sort: {
              attribute: [1, 2, 3],
            },
          },
        },
        {
          title: "sort->attribute: { }",
          responseBody: /attribute/,
          params: {
            sort: {
              attribute: { key: "value" },
            },
          },
        },
        {
          title: "sort->order: [ ]",
          responseBody: /order/,
          params: {
            sort: {
              attribute: "created_at",
              order: [1, 2, 3],
            },
          },
        },
        {
          title: "sort->order: { }",
          responseBody: /order/,
          params: {
            sort: {
              attribute: "created_at",
              order: { key: "value" },
            },
          },
        },
      ].forEach((params) => {
        it(`${params.title}`, () =>
          request(app.getHttpServer())
            .get(`/users/1/messages`)
            .query(params.params)
            .expect(params.responseBody)
            .expect(HttpStatus.BAD_REQUEST));
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
