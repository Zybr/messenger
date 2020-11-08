import {MigrationInterface, QueryRunner, Table} from "typeorm";

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
                {
                    name: 'created_at',
                    type: 'datetime',
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages');
    }
}
