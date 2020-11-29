import { ArgumentsHost, BadRequestException } from "@nestjs/common";
import SocketBadRequestExceptionFilter from "./socket-bad-request-exception.filter";

describe("AllExceptionsFilter", () => {
  let filter: SocketBadRequestExceptionFilter;
  const exception = {
    getResponse: () => ({
      statusCode: 400,
    }),
  } as BadRequestException;
  const socket = {
    emit: () => undefined,
  };
  const host = {
    switchToHttp: () => ({
      getRequest: () => socket,
    }),
  } as ArgumentsHost;

  beforeEach(() => {
    filter = new SocketBadRequestExceptionFilter();
  });

  it("Built", () => expect(filter).toBeDefined());

  it(".catch()", () => {
    const emitMethod = jest.spyOn(socket, "emit");
    filter.catch(exception, host);
    expect(emitMethod).toHaveBeenCalledWith(
      "exception",
      exception.getResponse()
    );
  });
});
