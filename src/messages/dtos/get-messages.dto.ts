import { IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import SortDto from "../../dtos/sort.dto";
import PaginationDto from "../../dtos/pagination.dto";

export default class GetMessagesDto {
  @Type(() => SortDto)
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

  @Type(() => PaginationDto)
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
