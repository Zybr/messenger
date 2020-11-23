import { Injectable, PipeTransform, NotFoundException } from "@nestjs/common";
import Message from "../messages/entities/message.entity";
import MessagesService from "../messages/services/messages.service";

/**
 * Define message by ID
 */
@Injectable()
export default class MessageByIdPipe implements PipeTransform {
  constructor(private messagesService: MessagesService) {}

  /** @inheritDoc */
  public transform(id: string | never): Promise<Message> {
    return this.getMessage(id).then((message) =>
      !(message instanceof Message)
        ? Promise.reject(new NotFoundException("Message was not found."))
        : message
    );
  }

  /**
   * Fetch message by identifier
   *
   * @param id Message identifier
   * @private
   */
  private getMessage(id: string | never): Promise<Message> {
    const identifier = parseInt(id, 10);
    if (Number.isNaN(identifier)) {
      return Promise.resolve(null);
    }

    return this.messagesService.findOne(identifier);
  }
}
