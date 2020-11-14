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
  id: number;

  @Column("int")
  sender: number;

  @Column("int")
  recipient: number;

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
