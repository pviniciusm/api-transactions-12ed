import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesDelegacia1689816371634 implements MigrationInterface {
    name = 'CreateTablesDelegacia1689816371634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aula"."Vitima" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "endereco" character varying NOT NULL, "dthr_criacao" TIMESTAMP NOT NULL DEFAULT now(), "dthr_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3cd799c9943559e7f68c876598" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aula"."ocorrencia" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "id_vitima" uuid NOT NULL, "id_crime" uuid NOT NULL, "dt_ocorrencia" date NOT NULL, "dthrCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dthrAtualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_97d349666ef26597801eaed425c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aula"."delegacia" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "endereco" character varying NOT NULL, "telefone" character varying NOT NULL, "dthrCriacao" TIMESTAMP NOT NULL DEFAULT now(), "dthrAtualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_663784bfaa8162a36d5a561d164" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aula"."crime" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "num_bo" integer NOT NULL, "local" character varying, "descricao" character varying NOT NULL, "crime_delegacia" uuid NOT NULL, "dthr_criacao" TIMESTAMP NOT NULL DEFAULT now(), "dthr_atualizacao" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ed2f40b4ce7a91ec22c50f3c894" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "aula"."ocorrencia" ADD CONSTRAINT "FK_ab2674378167fd48958f32268b2" FOREIGN KEY ("id_crime") REFERENCES "aula"."crime"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aula"."ocorrencia" ADD CONSTRAINT "FK_7e586021bcb00b31b30f65f8f50" FOREIGN KEY ("id_vitima") REFERENCES "aula"."Vitima"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aula"."crime" ADD CONSTRAINT "FK_49fb8e564c1a3f92df309f305c9" FOREIGN KEY ("crime_delegacia") REFERENCES "aula"."delegacia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."crime" DROP CONSTRAINT "FK_49fb8e564c1a3f92df309f305c9"`);
        await queryRunner.query(`ALTER TABLE "aula"."ocorrencia" DROP CONSTRAINT "FK_7e586021bcb00b31b30f65f8f50"`);
        await queryRunner.query(`ALTER TABLE "aula"."ocorrencia" DROP CONSTRAINT "FK_ab2674378167fd48958f32268b2"`);
        await queryRunner.query(`DROP TABLE "aula"."crime"`);
        await queryRunner.query(`DROP TABLE "aula"."delegacia"`);
        await queryRunner.query(`DROP TABLE "aula"."ocorrencia"`);
        await queryRunner.query(`DROP TABLE "aula"."Vitima"`);
    }

}
