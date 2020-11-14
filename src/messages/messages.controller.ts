import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import NotFoundApiResponse from "../decorators/api/not-found.api-response.decorator";
import MessagesService from "./messages.service";
import CreateMessageDto from "./dto/create-message.dto";
import UpdateMessageDto from "./dto/update-message.dto";
import Message from "./entities/message.entity";

@Controller("messages")
export default class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get message.",
  })
  @NotFoundApiResponse({
    description: "Message was not found.",
  })
  async findOne(@Param("id") id: number): Promise<Message> {
    const message = await this.messagesService.findOne(id);

    if (!(message instanceof Message)) {
      throw new NotFoundException("Message was not found.");
    }

    return message;
  }

  @Put(":id")
  @NotFoundApiResponse({
    description: "Message was not found.",
  })
  async update(
    @Param("id") id: number,
    @Body() updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    const message = await this.messagesService.findOne(id);

    if (!(message instanceof Message)) {
      throw new NotFoundException("Message was not found.");
    }

    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number): void {
    (async () => {
      await this.messagesService.remove(id);
    })();
  }
}
