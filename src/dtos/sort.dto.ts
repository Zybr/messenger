import { IsNotEmpty, IsString, IsOptional, IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class SortDto {
  @IsString()
  @IsNotEmpty()
  attribute?: string;

  @IsString()
  @IsOptional()
  @IsIn(["asc", "desc"])
  @ApiProperty({})
  order?: string;
}
