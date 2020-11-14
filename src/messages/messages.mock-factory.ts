// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from "faker";
import * as moment from "moment";
import Message from "./entities/message.entity";
import CreateMessageDto from "./dto/create-message.dto";
import UpdateMessageDto from "./dto/update-message.dto";

export default class MessagesMockFactory {
  public static makeMessage(
    attributes: {
      id?: number;
      sender?: number;
      recipient?: number;
      text?: string;
      created_at?: moment.Moment;
      updated_at?: moment.Moment;
    } = {}
  ): Message {
    const message = new Message();
    message.id = attributes.id || faker.random.number();
    message.sender = attributes.sender || faker.random.number();
    message.recipient = attributes.recipient || faker.random.number();
    message.text = attributes.text || faker.lorem.words();
    message.created_at = attributes.created_at || moment();
    message.updated_at = attributes.updated_at || moment();

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
