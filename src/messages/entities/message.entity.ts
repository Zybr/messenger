import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import moment from "moment";
import UpdateDateColumn from "../../decorators/properties/update-date-column.decorator";

@Entity("messages")
export default class Message {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "User sender ID",
    example: 1,
  })
  @Column("int")
  sender: number;

  @ApiProperty({
    description: "User recipient ID",
    example: 2,
  })
  @Column("int")
  recipient: number;

  @ApiProperty({
    description: "Message content",
    example: "Hello",
  })
  @Column("text")
  text: string;

  @ApiProperty({
    type: "string",
    format: "date-time",
  })
  @CreateDateColumn()
  created_at: moment.Moment;

  @ApiProperty({
    type: "string",
    format: "date-time",
  })
  @UpdateDateColumn()
  updated_at: moment.Moment;
}
