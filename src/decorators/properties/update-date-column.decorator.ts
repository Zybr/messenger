import { UpdateDateColumn as OrmUpdateDateColumn } from "typeorm";

/** Decorator for column which contain the time of last change */
const UpdateDateColumn = (...args: string[]): PropertyDecorator =>
  OrmUpdateDateColumn({
    onUpdate: "CURRENT_TIMESTAMP(6)",
    ...args,
  });

export default UpdateDateColumn;
