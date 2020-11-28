import Message from "../../entities/message.entity";

/** Message was created */
export default class MessageCreatedEvent {
  /** Event name */
  public static readonly NAME = "message.created";

  /** Created model */
  public model: Message;

  public constructor(model: Message) {
    this.model = model;
  }
}
