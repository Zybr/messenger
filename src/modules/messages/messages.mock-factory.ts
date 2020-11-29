// eslint-disable-next-line max-classes-per-file,import/no-extraneous-dependencies
import * as faker from "faker";
import Message from "./entities/message.entity";
import CreateMessageDto from "./dtos/create-message.dto";
import UpdateMessageDto from "./dtos/update-message.dto";

export default class MessagesMockFactory {
  public static makeMessage(
    attributes: {
      sender?: number;
      recipient?: number;
      text?: string;
    } = {}
  ): Message {
    const message = new Message();
    message.sender = attributes.sender || faker.random.number();
    message.recipient = attributes.recipient || faker.random.number();
    message.text = attributes.text || faker.lorem.words();

    return message;
  }

  public static makeCreateMessageDto(
    attributes: {
      sender?: number;
      recipient?: number;
      text?: string;
    } = {}
  ): CreateMessageDto {
    const { sender, recipient, text } = this.makeMessage(attributes);

    return { sender, recipient, text };
  }

  public static makeUpdateMessageDto(
    attributes: {
      text?: string;
    } = {}
  ): UpdateMessageDto {
    const { text } = this.makeMessage(attributes);

    return { text };
  }
}
