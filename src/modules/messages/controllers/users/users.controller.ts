import { Controller, Get, Query, Param, ParseIntPipe } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import GetMessagesDto from "../../dtos/get-messages.dto";
import Message from "../../entities/message.entity";
import MessagesService from "../../services/messages.service";

@Controller("users")
export default class UsersController {
  constructor(private readonly messagesService: MessagesService) {}

  /** Get user messages */
  @Get(":id/messages")
  @ApiOperation({
    summary: "Get user messages.",
    parameters: [
      {
        name: "id",
        in: "query",
        description: "User ID",
        example: 1,
      },
    ],
  })
  public findAll(
    @Param("id", ParseIntPipe) id: number,
    @Query() filter: GetMessagesDto
  ): Promise<Message[]> {
    return this.messagesService
      .getFilter()
      .setRecipient(id)
      .setPagination(filter.pagination || {})
      .setSort(filter.sort || { attribute: "id" })
      .findAll();
  }
}
