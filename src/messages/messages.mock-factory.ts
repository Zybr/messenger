// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from "faker";
import * as moment from "moment";
import Message from "./entities/message.entity";
import CreateMessageDto from "./dto/create-message.dto";
import UpdateMessageDto from "./dto/update-message.dto";

export default class MessagesMockFactory {
  public static makeMessage(): Message {
    const message = new Message();
    message.id = faker.random.number();
    message.sender = faker.random.number();
    message.recipient = faker.random.number();
    message.text = faker.lorem.words();
    message.created_at = moment();
    message.updated_at = moment();

    return message;
  }

  public static makeCreateMessageDto(): CreateMessageDto {
    const { sender, recipient, text } = this.makeMessage();

    return { sender, recipient, text };
  }

  public static makeUpdateMessageDto(): UpdateMessageDto {
    const { text } = this.makeMessage();

    return { text };
  }
}
