import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateColumnsToTransaction1689809531543 implements MigrationInterface {
    name = 'AddDateColumnsToTransaction1689809531543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aula"."user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "cpf" integer NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aula"."transaction" ("id" character varying NOT NULL, "title" character varying NOT NULL, "value" integer NOT NULL, "estabelecimento" character varying(60), "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id_user" character varying NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aula"."transaction" ADD CONSTRAINT "FK_2a481f3c342fc4260014d0b6dad" FOREIGN KEY ("id_user") REFERENCES "aula"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."transaction" DROP CONSTRAINT "FK_2a481f3c342fc4260014d0b6dad"`);
        await queryRunner.query(`DROP TABLE "aula"."transaction"`);
        await queryRunner.query(`DROP TABLE "aula"."user"`);
    }

}
