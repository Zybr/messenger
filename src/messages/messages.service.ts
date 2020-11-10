import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeleteResult } from "typeorm/query-builder/result/DeleteResult";
import CreateMessageDto from "./dto/create-message.dto";
import UpdateMessageDto from "./dto/update-message.dto";
import Message from "./entities/message.entity";

@Injectable()
export default class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRep: Repository<Message>
  ) {}

  create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageRep.save(createMessageDto);
  }

  findAll(): Promise<Message[]> {
    return this.messageRep.find();
  }

  findOne(id: number): Promise<Message> {
    return this.messageRep.findOne(id);
  }

  update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    return this.messageRep
      .createQueryBuilder()
      .update(Message)
      .set(updateMessageDto)
      .where("id = :id", { id })
      .execute()
      .then(() => this.findOne(id));
  }

  remove(id: number): Promise<boolean> {
    return this.messageRep
      .delete(id)
      .then((result: DeleteResult) => result.affected !== 0);
  }
}
