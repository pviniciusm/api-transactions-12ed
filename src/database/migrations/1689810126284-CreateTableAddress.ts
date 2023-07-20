import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAddress1689810126284 implements MigrationInterface {
    name = "CreateTableAddress1689810126284";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "aula"."address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying NOT NULL, "number" integer NOT NULL, "zip_code" character varying(9) NOT NULL, "city" character varying NOT NULL, "id_user" character varying, CONSTRAINT "REL_0a48e44e5353c7f02955917871" UNIQUE ("id_user"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "aula"."address" ADD CONSTRAINT "FK_0a48e44e5353c7f029559178716" FOREIGN KEY ("id_user") REFERENCES "aula"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."address" DROP CONSTRAINT "FK_0a48e44e5353c7f029559178716"`);
        await queryRunner.query(`DROP TABLE "aula"."address"`);
    }
}
