import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCategory1689810564031 implements MigrationInterface {
    name = 'CreateTableCategory1689810564031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "aula"."category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aula"."user_categories_category" ("userId" character varying NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_5a62c2d9eba0ec02cda365b9ab7" PRIMARY KEY ("userId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_331665e2e7d360bf2b715dfeea" ON "aula"."user_categories_category" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936afd72159ca6d1143ab3d66a" ON "aula"."user_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "aula"."user_categories_category" ADD CONSTRAINT "FK_331665e2e7d360bf2b715dfeea9" FOREIGN KEY ("userId") REFERENCES "aula"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aula"."user_categories_category" ADD CONSTRAINT "FK_936afd72159ca6d1143ab3d66af" FOREIGN KEY ("categoryId") REFERENCES "aula"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aula"."user_categories_category" DROP CONSTRAINT "FK_936afd72159ca6d1143ab3d66af"`);
        await queryRunner.query(`ALTER TABLE "aula"."user_categories_category" DROP CONSTRAINT "FK_331665e2e7d360bf2b715dfeea9"`);
        await queryRunner.query(`DROP INDEX "aula"."IDX_936afd72159ca6d1143ab3d66a"`);
        await queryRunner.query(`DROP INDEX "aula"."IDX_331665e2e7d360bf2b715dfeea"`);
        await queryRunner.query(`DROP TABLE "aula"."user_categories_category"`);
        await queryRunner.query(`DROP TABLE "aula"."category"`);
    }

}
