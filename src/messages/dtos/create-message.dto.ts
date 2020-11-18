import { IsNotEmpty, IsInt, IsString, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: "User sender ID",
    example: 1,
  })
  public sender: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    description: "User recipient ID",
    example: 2,
  })
  public recipient: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Message content",
    example: "Hello",
  })
  public text: string;
}
