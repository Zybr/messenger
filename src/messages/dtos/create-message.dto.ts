import { IsNotEmpty, IsInt, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/** Parameters of message creation */
export default class CreateMessageDto {
  /** ID of user who send message */
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: "User sender ID",
    example: 1,
  })
  public sender: number;

  /** ID of user who receive message */
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: "User recipient ID",
    example: 2,
  })
  public recipient: number;

  /** Content of message */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Message content",
    example: "Hello",
  })
  public text: string;
}
