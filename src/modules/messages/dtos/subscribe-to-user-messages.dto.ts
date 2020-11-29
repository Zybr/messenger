import { IsNotEmpty, IsInt, Min } from "class-validator";

/** Parameters of subscribing to user incoming messages */
export default class SubscribeToUserMessagesDto {
  /** ID of user who receive message */
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  public recipient: number;
}
