import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1696504402783 implements MigrationInterface {
    name = 'InitialSetup1696504402783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "branchesId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying, "name" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_91ba90f150e8804bdaad7b17ff8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "variant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "itemId" uuid, CONSTRAINT "PK_f8043a8a34fa021a727a4718470" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "ammount" integer NOT NULL, "variantId" uuid, "transactionId" uuid, CONSTRAINT "PK_b40595241a69876722f692d041f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ammount" integer NOT NULL, "customerId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "item_categories_item_category" ("itemId" uuid NOT NULL, "itemCategoryId" uuid NOT NULL, CONSTRAINT "PK_051a856eb985bf54f8dd332672c" PRIMARY KEY ("itemId", "itemCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f65b353cd2bfede292d5c70736" ON "item_categories_item_category" ("itemId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c525f050f301e536e3b8e1c169" ON "item_categories_item_category" ("itemCategoryId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_b58f7560cb53a5ef9bbdab8ec2f" FOREIGN KEY ("branchesId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_f969fd357b4491268a4520e8a07" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "variant" ADD CONSTRAINT "FK_7c5a92f38155a36a7263aec0770" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_item" ADD CONSTRAINT "FK_c98364281512ad50dafca245b19" FOREIGN KEY ("variantId") REFERENCES "variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_item" ADD CONSTRAINT "FK_2705caeb66a0fa4505f53f04e8f" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_categories_item_category" ADD CONSTRAINT "FK_f65b353cd2bfede292d5c707361" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item_categories_item_category" ADD CONSTRAINT "FK_c525f050f301e536e3b8e1c1697" FOREIGN KEY ("itemCategoryId") REFERENCES "item_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_categories_item_category" DROP CONSTRAINT "FK_c525f050f301e536e3b8e1c1697"`);
        await queryRunner.query(`ALTER TABLE "item_categories_item_category" DROP CONSTRAINT "FK_f65b353cd2bfede292d5c707361"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_16ead8467f1f71ac7232aa46ad3"`);
        await queryRunner.query(`ALTER TABLE "transaction_item" DROP CONSTRAINT "FK_2705caeb66a0fa4505f53f04e8f"`);
        await queryRunner.query(`ALTER TABLE "transaction_item" DROP CONSTRAINT "FK_c98364281512ad50dafca245b19"`);
        await queryRunner.query(`ALTER TABLE "variant" DROP CONSTRAINT "FK_7c5a92f38155a36a7263aec0770"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_f969fd357b4491268a4520e8a07"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b58f7560cb53a5ef9bbdab8ec2f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c525f050f301e536e3b8e1c169"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f65b353cd2bfede292d5c70736"`);
        await queryRunner.query(`DROP TABLE "item_categories_item_category"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction_item"`);
        await queryRunner.query(`DROP TABLE "variant"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "item_category"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
