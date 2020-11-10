import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
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
  findOne(@Param("id") id: string): Promise<Message> {
    return this.messagesService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): void {
    (async () => {
      await this.messagesService.remove(+id);
    })();
  }
}
