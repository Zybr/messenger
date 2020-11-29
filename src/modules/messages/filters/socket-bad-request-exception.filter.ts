import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  BadRequestException,
} from "@nestjs/common";
import { Socket } from "socket.io";

@Catch(BadRequestException)
export default class SocketBadRequestExceptionFilter
  implements ExceptionFilter {
  private host: ArgumentsHost;

  public catch(exception: BadRequestException, host: ArgumentsHost): void {
    this.host = host;
    this.getSocket().emit("exception", exception.getResponse());
  }

  private getSocket(): Socket {
    return this.host.switchToHttp().getRequest<Socket>();
  }
}
