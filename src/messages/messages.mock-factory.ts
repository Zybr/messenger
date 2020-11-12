// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from "faker";
import * as moment from "moment";
import Message from "./entities/message.entity";
import CreateMessageDto from "./dto/create-message.dto";
import UpdateMessageDto from "./dto/update-message.dto";

export default class MessagesMockFactory {
  public static makeMessage(): Message {
    return {
      id: faker.random.number(),
      sender: faker.random.number(),
      recipient: faker.random.number(),
      text: faker.lorem.words(),
      created_at: moment(),
      updated_at: moment(),
    };
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
