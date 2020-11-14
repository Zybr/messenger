import { IsNotEmpty, IsInt, Min, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class CreateMessageDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: "User sender ID",
    example: 1,
  })
  sender: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: "User recipient ID",
    example: 2,
  })
  recipient: number;

  @Length(1)
  @ApiProperty({
    description: "Message content",
    example: "Hello",
  })
  text: string;
}
