import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import CreateMessageDto from "../dtos/create-message.dto";
import UpdateMessageDto from "../dtos/update-message.dto";
import Message from "../entities/message.entity";
import MessagesFilter from "./messages.filter";

@Injectable()
export default class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly repository: Repository<Message>,
    @Inject(MessagesFilter) private readonly filter: MessagesFilter
  ) {}

  public create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.repository.save(createMessageDto);
  }

  public findAll(): Promise<Message[]> {
    return this.repository.find();
  }

  public findOne(id: number): Promise<Message> {
    return this.repository.findOne(id);
  }

  public update(
    id: number,
    updateMessageDto: UpdateMessageDto
  ): Promise<Message> {
    return this.repository
      .createQueryBuilder()
      .update(Message)
      .set(updateMessageDto)
      .where("id = :id", { id })
      .execute()
      .then(() => this.findOne(id));
  }

  public remove(id: number): Promise<boolean> {
    return this.repository
      .delete(id)
      .then((result: DeleteResult) => result.affected !== 0);
  }

  public getFilter(): MessagesFilter {
    return this.filter;
  }
}
