import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class PrimeiraMigration1689805722161 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query("CREATE TABLE transactions.teste ( id varchar primary key, nome varchar not null )");

        await queryRunner.createTable(
            new Table({
                name: "teste",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isNullable: false,
                        length: "60",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query("DROP TABLE transactions.teste");
        await queryRunner.dropTable("transactions.teste");
    }
}
