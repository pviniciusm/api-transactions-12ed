import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1692233524092 implements MigrationInterface {
    name = 'TestMigration1692233524092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "value" integer NOT NULL, "estabelecimento" varchar(60), "type" varchar CHECK( "type" IN ('I','O') ) NOT NULL, "id_user" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "cpf" integer NOT NULL, "email" varchar NOT NULL, "age" integer NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "address" ("id" varchar PRIMARY KEY NOT NULL, "street" varchar NOT NULL, "number" integer NOT NULL, "zip_code" varchar(9) NOT NULL, "city" varchar NOT NULL, "id_user" varchar, CONSTRAINT "REL_0a48e44e5353c7f02955917871" UNIQUE ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "Vitima" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "endereco" varchar NOT NULL, "dthr_criacao" datetime NOT NULL DEFAULT (datetime('now')), "dthr_atualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "ocorrencia" ("id" varchar PRIMARY KEY NOT NULL, "id_vitima" varchar NOT NULL, "id_crime" varchar NOT NULL, "dt_ocorrencia" date NOT NULL, "dthrCriacao" datetime NOT NULL DEFAULT (datetime('now')), "dthrAtualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "delegacia" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar NOT NULL, "endereco" varchar NOT NULL, "telefone" varchar NOT NULL, "dthrCriacao" datetime NOT NULL DEFAULT (datetime('now')), "dthrAtualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "crime" ("id" varchar PRIMARY KEY NOT NULL, "num_bo" integer NOT NULL, "local" varchar, "descricao" varchar NOT NULL, "crime_delegacia" varchar NOT NULL, "dthr_criacao" datetime NOT NULL DEFAULT (datetime('now')), "dthr_atualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "user_categories_category" ("userId" varchar NOT NULL, "categoryId" varchar NOT NULL, PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_331665e2e7d360bf2b715dfeea" ON "user_categories_category" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936afd72159ca6d1143ab3d66a" ON "user_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "value" integer NOT NULL, "estabelecimento" varchar(60), "type" varchar CHECK( "type" IN ('I','O') ) NOT NULL, "id_user" varchar NOT NULL, CONSTRAINT "FK_2a481f3c342fc4260014d0b6dad" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "title", "value", "estabelecimento", "type", "id_user") SELECT "id", "title", "value", "estabelecimento", "type", "id_user" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
        await queryRunner.query(`CREATE TABLE "temporary_address" ("id" varchar PRIMARY KEY NOT NULL, "street" varchar NOT NULL, "number" integer NOT NULL, "zip_code" varchar(9) NOT NULL, "city" varchar NOT NULL, "id_user" varchar, CONSTRAINT "REL_0a48e44e5353c7f02955917871" UNIQUE ("id_user"), CONSTRAINT "FK_0a48e44e5353c7f029559178716" FOREIGN KEY ("id_user") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_address"("id", "street", "number", "zip_code", "city", "id_user") SELECT "id", "street", "number", "zip_code", "city", "id_user" FROM "address"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "temporary_address" RENAME TO "address"`);
        await queryRunner.query(`CREATE TABLE "temporary_ocorrencia" ("id" varchar PRIMARY KEY NOT NULL, "id_vitima" varchar NOT NULL, "id_crime" varchar NOT NULL, "dt_ocorrencia" date NOT NULL, "dthrCriacao" datetime NOT NULL DEFAULT (datetime('now')), "dthrAtualizacao" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_ab2674378167fd48958f32268b2" FOREIGN KEY ("id_crime") REFERENCES "crime" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7e586021bcb00b31b30f65f8f50" FOREIGN KEY ("id_vitima") REFERENCES "Vitima" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_ocorrencia"("id", "id_vitima", "id_crime", "dt_ocorrencia", "dthrCriacao", "dthrAtualizacao") SELECT "id", "id_vitima", "id_crime", "dt_ocorrencia", "dthrCriacao", "dthrAtualizacao" FROM "ocorrencia"`);
        await queryRunner.query(`DROP TABLE "ocorrencia"`);
        await queryRunner.query(`ALTER TABLE "temporary_ocorrencia" RENAME TO "ocorrencia"`);
        await queryRunner.query(`CREATE TABLE "temporary_crime" ("id" varchar PRIMARY KEY NOT NULL, "num_bo" integer NOT NULL, "local" varchar, "descricao" varchar NOT NULL, "crime_delegacia" varchar NOT NULL, "dthr_criacao" datetime NOT NULL DEFAULT (datetime('now')), "dthr_atualizacao" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_49fb8e564c1a3f92df309f305c9" FOREIGN KEY ("crime_delegacia") REFERENCES "delegacia" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_crime"("id", "num_bo", "local", "descricao", "crime_delegacia", "dthr_criacao", "dthr_atualizacao") SELECT "id", "num_bo", "local", "descricao", "crime_delegacia", "dthr_criacao", "dthr_atualizacao" FROM "crime"`);
        await queryRunner.query(`DROP TABLE "crime"`);
        await queryRunner.query(`ALTER TABLE "temporary_crime" RENAME TO "crime"`);
        await queryRunner.query(`DROP INDEX "IDX_331665e2e7d360bf2b715dfeea"`);
        await queryRunner.query(`DROP INDEX "IDX_936afd72159ca6d1143ab3d66a"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_categories_category" ("userId" varchar NOT NULL, "categoryId" varchar NOT NULL, CONSTRAINT "FK_331665e2e7d360bf2b715dfeea9" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_936afd72159ca6d1143ab3d66af" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_categories_category"("userId", "categoryId") SELECT "userId", "categoryId" FROM "user_categories_category"`);
        await queryRunner.query(`DROP TABLE "user_categories_category"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_categories_category" RENAME TO "user_categories_category"`);
        await queryRunner.query(`CREATE INDEX "IDX_331665e2e7d360bf2b715dfeea" ON "user_categories_category" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936afd72159ca6d1143ab3d66a" ON "user_categories_category" ("categoryId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_936afd72159ca6d1143ab3d66a"`);
        await queryRunner.query(`DROP INDEX "IDX_331665e2e7d360bf2b715dfeea"`);
        await queryRunner.query(`ALTER TABLE "user_categories_category" RENAME TO "temporary_user_categories_category"`);
        await queryRunner.query(`CREATE TABLE "user_categories_category" ("userId" varchar NOT NULL, "categoryId" varchar NOT NULL, PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`INSERT INTO "user_categories_category"("userId", "categoryId") SELECT "userId", "categoryId" FROM "temporary_user_categories_category"`);
        await queryRunner.query(`DROP TABLE "temporary_user_categories_category"`);
        await queryRunner.query(`CREATE INDEX "IDX_936afd72159ca6d1143ab3d66a" ON "user_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_331665e2e7d360bf2b715dfeea" ON "user_categories_category" ("userId") `);
        await queryRunner.query(`ALTER TABLE "crime" RENAME TO "temporary_crime"`);
        await queryRunner.query(`CREATE TABLE "crime" ("id" varchar PRIMARY KEY NOT NULL, "num_bo" integer NOT NULL, "local" varchar, "descricao" varchar NOT NULL, "crime_delegacia" varchar NOT NULL, "dthr_criacao" datetime NOT NULL DEFAULT (datetime('now')), "dthr_atualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "crime"("id", "num_bo", "local", "descricao", "crime_delegacia", "dthr_criacao", "dthr_atualizacao") SELECT "id", "num_bo", "local", "descricao", "crime_delegacia", "dthr_criacao", "dthr_atualizacao" FROM "temporary_crime"`);
        await queryRunner.query(`DROP TABLE "temporary_crime"`);
        await queryRunner.query(`ALTER TABLE "ocorrencia" RENAME TO "temporary_ocorrencia"`);
        await queryRunner.query(`CREATE TABLE "ocorrencia" ("id" varchar PRIMARY KEY NOT NULL, "id_vitima" varchar NOT NULL, "id_crime" varchar NOT NULL, "dt_ocorrencia" date NOT NULL, "dthrCriacao" datetime NOT NULL DEFAULT (datetime('now')), "dthrAtualizacao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "ocorrencia"("id", "id_vitima", "id_crime", "dt_ocorrencia", "dthrCriacao", "dthrAtualizacao") SELECT "id", "id_vitima", "id_crime", "dt_ocorrencia", "dthrCriacao", "dthrAtualizacao" FROM "temporary_ocorrencia"`);
        await queryRunner.query(`DROP TABLE "temporary_ocorrencia"`);
        await queryRunner.query(`ALTER TABLE "address" RENAME TO "temporary_address"`);
        await queryRunner.query(`CREATE TABLE "address" ("id" varchar PRIMARY KEY NOT NULL, "street" varchar NOT NULL, "number" integer NOT NULL, "zip_code" varchar(9) NOT NULL, "city" varchar NOT NULL, "id_user" varchar, CONSTRAINT "REL_0a48e44e5353c7f02955917871" UNIQUE ("id_user"))`);
        await queryRunner.query(`INSERT INTO "address"("id", "street", "number", "zip_code", "city", "id_user") SELECT "id", "street", "number", "zip_code", "city", "id_user" FROM "temporary_address"`);
        await queryRunner.query(`DROP TABLE "temporary_address"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "value" integer NOT NULL, "estabelecimento" varchar(60), "type" varchar CHECK( "type" IN ('I','O') ) NOT NULL, "id_user" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "title", "value", "estabelecimento", "type", "id_user") SELECT "id", "title", "value", "estabelecimento", "type", "id_user" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`DROP INDEX "IDX_936afd72159ca6d1143ab3d66a"`);
        await queryRunner.query(`DROP INDEX "IDX_331665e2e7d360bf2b715dfeea"`);
        await queryRunner.query(`DROP TABLE "user_categories_category"`);
        await queryRunner.query(`DROP TABLE "crime"`);
        await queryRunner.query(`DROP TABLE "delegacia"`);
        await queryRunner.query(`DROP TABLE "ocorrencia"`);
        await queryRunner.query(`DROP TABLE "Vitima"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
