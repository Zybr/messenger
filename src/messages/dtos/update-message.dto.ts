import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import CreateMessageDto from "./create-message.dto";

/** Parameters of message updating */
export default class UpdateMessageDto extends PartialType(CreateMessageDto) {
  /** Content of message */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Message content",
    example: "Hello",
  })
  public text: string;
}
