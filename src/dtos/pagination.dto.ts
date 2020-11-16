import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class PaginationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 10,
  })
  size?: number;

  // TODO: implement attributes: number
}
