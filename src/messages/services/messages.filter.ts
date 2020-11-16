import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Message from "../entities/message.entity";
import SortDto from "../../dtos/sort.dto";
import PaginationDto from "../../dtos/pagination.dto";

@Injectable()
export default class MessagesFilter {
  private recipient?: number;

  private sort?: SortDto;

  private pagination?: PaginationDto;

  constructor(
    @InjectRepository(Message) private readonly repository: Repository<Message>
  ) {}

  public setRecipient(recipientId: number): MessagesFilter {
    this.recipient = recipientId;

    return this;
  }

  public setSort(sortParams: SortDto): MessagesFilter {
    this.sort = sortParams;

    return this;
  }

  public setPagination(paginationParams: PaginationDto): MessagesFilter {
    this.pagination = paginationParams;

    return this;
  }

  public findAll(): Promise<Message[]> {
    const builder = this.repository
      .createQueryBuilder("messages")
      .select("messages.*");

    if (this.recipient) {
      builder.andWhere("recipient = :recipient", { recipient: this.recipient });
    }

    if (this.sort?.attribute) {
      builder.orderBy(
        this.sort.attribute,
        this.sort.order?.toUpperCase() === "DESC" ? "DESC" : "ASC"
      );
    }

    if (this.pagination?.size) {
      builder.limit(this.pagination?.size);
    }

    const result = builder.execute();
    this.clear();

    return result;
  }

  private clear(): MessagesFilter {
    this.sort = null;
    this.pagination = null;

    return this;
  }
}
