import { IsNotEmpty, IsString, IsOptional, IsIn } from "class-validator";

/** List sort options */
export default class SortDto {
  /** Field of sorting */
  @IsString()
  @IsNotEmpty()
  attribute: string;

  /** Sorting direction */
  @IsString()
  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: string;
}
