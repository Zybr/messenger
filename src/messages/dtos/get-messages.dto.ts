import { IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import SortDto from "../../dtos/sort.dto";
import PaginationDto from "../../dtos/pagination.dto";

/** Filter options of messages list */
export default class GetMessagesDto {
  /** Sorting options */
  @Type(() => SortDto)
  @ValidateNested({ each: true })
  @IsOptional()
  @ApiProperty({
    type: "object",
    example: {
      sort: {
        attribute: "id",
        order: "desc",
      },
    },
  })
  public sort?: SortDto;

  /** Pagination options */
  @Type(() => PaginationDto)
  @ValidateNested({ each: true })
  @IsOptional()
  @ApiProperty({
    type: "object",
    example: {
      pagination: {
        size: 10,
      },
    },
  })
  public pagination?: PaginationDto;
}
