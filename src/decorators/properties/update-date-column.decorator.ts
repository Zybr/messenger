import { UpdateDateColumn as OrmUpdateDateColumn } from "typeorm";

const UpdateDateColumn = (...args: string[]): PropertyDecorator =>
  OrmUpdateDateColumn({
    onUpdate: "CURRENT_TIMESTAMP(6)",
    ...args,
  });

export default UpdateDateColumn;
