import { IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/** Pagination options */
export default class PaginationDto {
  /** Page size */
  @IsInt()
  @IsOptional()
  @ApiProperty({
    example: 10,
  })
  size?: number;

  // TODO: implement attributes: number
}
