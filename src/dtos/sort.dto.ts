import { IsNotEmpty, IsString, IsOptional, IsIn } from "class-validator";

export default class SortDto {
  @IsString()
  @IsNotEmpty()
  attribute: string;

  @IsString()
  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: string;
}
