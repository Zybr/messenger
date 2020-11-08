import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

  @Column("datetime")
  created_at: Date;

  @Column("datetime")
  updated_at: Date;
}
