import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import CreateMessageDto from "./create-message.dto";

export default class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsNotEmpty()
  @ApiProperty({
    description: "Message content",
    example: "Hello",
  })
  text: string;
}
