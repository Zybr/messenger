import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import NotFoundApiResponse from "../../../../decorators/api/not-found.api-response.decorator";
import BadRequestApiResponse from "../../../../decorators/api/bad-request.api-response.decorator";
import MessagesService from "../../services/messages.service";
import CreateMessageDto from "../../dtos/create-message.dto";
import UpdateMessageDto from "../../dtos/update-message.dto";
import Message from "../../entities/message.entity";
import MessageByIdPipe from "../../pipes/message-by-id.pipe";
import MessageIdApiParam from "../../decorators/message-id-api-param.decorator";

@Controller("messages")
export default class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  /** Create */
  @Post()
  @ApiOperation({ summary: "Create message." })
  @BadRequestApiResponse()
  public create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  /** Get list */
  @Get()
  @ApiOperation({ summary: "Get messages." })
  public findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  /** Get one */
  @Get(":id")
  @ApiOperation({ summary: "Get message." })
  @MessageIdApiParam()
  @NotFoundApiResponse() // eslint-disable-next-line class-methods-use-this
  public async findOne(
    @Param("id", MessageByIdPipe) message: Promise<Message>
  ): Promise<Message> {
    return message;
  }

  /** Update */
  @Put(":id")
  @ApiOperation({ summary: "Update message." })
  @MessageIdApiParam()
  @NotFoundApiResponse()
  @BadRequestApiResponse()
  public async update(
    @Param("id", MessageByIdPipe) message: Promise<Message>,
    @Body() updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    return this.messagesService.update((await message).id, updateMessageDto);
  }

  /** Remove */
  @Delete(":id")
  @ApiOperation({ summary: "Remove message." })
  @MessageIdApiParam()
  public remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.messagesService.remove(id).then(() => undefined);
  }
}
