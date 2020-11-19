import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import CreateMessageDto from "../dtos/create-message.dto";
import UpdateMessageDto from "../dtos/update-message.dto";
import Message from "../entities/message.entity";
import MessagesFilter from "./messages.filter";

/** Messages manager */
@Injectable()
export default class MessagesService {
  constructor(
    @InjectRepository(Message) private readonly repository: Repository<Message>,
    @Inject(MessagesFilter) private readonly filter: MessagesFilter
  ) {}

  /** Create message */
  public create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.repository.save(createMessageDto);
  }

  /** Fetch all message */
  public findAll(): Promise<Message[]> {
    return this.repository.find();
  }

  /** Fetch specific message */
  public findOne(id: number): Promise<Message> {
    return this.repository.findOne(id);
  }

  /** Update message */
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

  /** Remove message */
  public remove(id: number): Promise<boolean> {
    return this.repository
      .delete(id)
      .then((result: DeleteResult) => result.affected !== 0);
  }

  /** Get extended filter */
  public getFilter(): MessagesFilter {
    return this.filter;
  }
}
