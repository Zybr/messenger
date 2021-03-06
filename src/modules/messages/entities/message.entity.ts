import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import moment from "moment";
import UpdateDateColumn from "../../../decorators/properties/update-date-column.decorator";

@Entity("messages")
export default class Message {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  /** Author of message */
  @Column("int")
  public sender: number;

  /** Recipient */
  @Column("int")
  public recipient: number;

  /** Content of message */
  @Column("text")
  public text: string;

  @ApiProperty({
    type: "string",
    format: "date-time",
    readOnly: true,
  })
  @CreateDateColumn()
  public readonly created_at: moment.Moment;

  @ApiProperty({
    type: "string",
    format: "date-time",
    readOnly: true,
  })
  @UpdateDateColumn()
  public readonly updated_at: moment.Moment;
}
