import {
  SubscribeMessage,
  WebSocketServer,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { UsePipes, ValidationPipe, UseFilters } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Server, Socket } from "socket.io";
import MessageCreatedEvent from "../events/events/message-created.event";
import SubscribeToUserMessagesDto from "../dtos/subscribe-to-user-messages.dto";
import SocketBadRequestExceptionFilter from "../filters/socket-bad-request-exception.filter";

type Client = {
  meta: {
    recipient: number;
  };
  socket: Socket;
};

@WebSocketGateway({ namespace: "messages" })
export default class MessagesGateway {
  @WebSocketServer()
  server: Server;

  /** Subscribers */
  clients: Client[] = [];

  public constructor(private readonly eventEmitter: EventEmitter2) {
    this.initEmissions();
  }

  @SubscribeMessage("subscribe")
  @UsePipes(new ValidationPipe())
  @UseFilters(new SocketBadRequestExceptionFilter())
  handleSubscribe(
    @MessageBody() meta: SubscribeToUserMessagesDto,
    @ConnectedSocket() socket: Socket
  ): Record<string, string | number> {
    this.clients.push({ meta, socket });

    return { message: "Subscription established" };
  }

  /** Initialize actions */
  private initEmissions(): void {
    this.eventEmitter.on(
      MessageCreatedEvent.NAME,
      (event: MessageCreatedEvent) => {
        this.clients
          .filter(
            (listener) => listener.meta.recipient === event.model.recipient
          )
          .forEach((listener) =>
            listener.socket.emit(MessageCreatedEvent.NAME, event)
          );
      }
    );
  }
}
