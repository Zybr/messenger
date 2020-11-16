import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import GetMessagesDto from "../../dtos/get-messages.dto";
import Message from "../../entities/message.entity";
import MessagesService from "../../services/messages.service";

@Controller("users")
export default class UsersController {
  constructor(private readonly messagesService: MessagesService) {}

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
  public getMessages(
    @Query("id") user: number,
    @Query() filter: GetMessagesDto
  ): Promise<Message[]> {
    return this.messagesService
      .getFilter()
      .setRecipient(user)
      .setPagination(filter.pagination)
      .setSort(filter.sort)
      .findAll();
  }
}
