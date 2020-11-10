import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

const createdAt = (): TableColumnOptions => ({
  name: "created_at",
  type: "datetime",
  default: "CURRENT_TIMESTAMP(6)",
  precision: 6,
});

export default {
  createdAt,
};
