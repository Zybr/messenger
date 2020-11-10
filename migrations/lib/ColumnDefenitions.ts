import {TableColumnOptions} from "typeorm/schema-builder/options/TableColumnOptions";

const TIME_PRECISION = 6;

const createdAt = (options: Record<string, unknown>|TableColumnOptions = {}): TableColumnOptions => ({
        name: 'created_at',
        type: 'datetime',
        default: `CURRENT_TIMESTAMP(${TIME_PRECISION})`,
        precision: TIME_PRECISION,
        ...options
    });

const updatedAt = (): TableColumnOptions => createdAt({
    name: 'updated_at',
    onUpdate: `CURRENT_TIMESTAMP(${TIME_PRECISION})`,
});

export default {
    createdAt,
    updatedAt
};
