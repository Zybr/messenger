import {
  UpdateDateColumn as OrmUpdateDateColumn,
  ColumnOptions,
} from "typeorm";

/** Decorator for column which contain the time of last change */
const UpdateDateColumn = (options?: ColumnOptions): PropertyDecorator =>
  OrmUpdateDateColumn({
    onUpdate: "CURRENT_TIMESTAMP(6)",
    ...options,
  });

export default UpdateDateColumn;
