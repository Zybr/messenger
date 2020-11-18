import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import NotFoundApiResponse from "../../../decorators/api/not-found.api-response.decorator";
import BadRequestApiResponse from "../../../decorators/api/bad-request.api-response.decorator";
import MessagesService from "../../services/messages.service";
import CreateMessageDto from "../../dtos/create-message.dto";
import UpdateMessageDto from "../../dtos/update-message.dto";
import Message from "../../entities/message.entity";

@Controller("messages")
export default class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({
    summary: "Create message.",
  })
  @BadRequestApiResponse()
  public create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get messages.",
  })
  public findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get message.",
  })
  @NotFoundApiResponse()
  public async findOne(
    @Param("id", new ParseIntPipe()) id: number
  ): Promise<Message> {
    const message = await this.messagesService.findOne(id);

    if (!(message instanceof Message)) {
      throw new NotFoundException("Message was not found.");
    }

    return message;
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update message.",
  })
  @NotFoundApiResponse()
  @BadRequestApiResponse()
  public async update(
    @Param("id", new ParseIntPipe()) id: number,
    @Body() updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    const message = await this.messagesService.findOne(id);

    if (!(message instanceof Message)) {
      throw new NotFoundException("Message was not found.");
    }

    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Remove message.",
  })
  public remove(@Param("id", new ParseIntPipe()) id: number): void {
    (async () => {
      await this.messagesService.remove(id);
    })();
  }
}
