import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

/** Pagination options */
export default class PaginationDto {
  /** Page size */
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(1)
  @ApiProperty({
    description: "Number of items",
    example: 10,
  })
  public size?: number;

  // TODO: implement attributes: number
}
