import {MigrationInterface, QueryRunner, Table} from "typeorm";
import ColumnDefinitions from "./lib/ColumnDefenitions"

export default class CreateMessages1604847300633 implements MigrationInterface {
    name = 'CreateMessages1604847300633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'messages',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'sender',
                    type: 'int',
                },
                {
                    name: 'recipient',
                    type: 'int',
                },
                {
                    name: 'text',
                    type: 'text',
                },
                ColumnDefinitions.createdAt(),
                ColumnDefinitions.updatedAt(),
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
    }
}
