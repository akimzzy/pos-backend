import { MigrationInterface, QueryRunner } from 'typeorm';

export class StockTrackingSetup1697106220475 implements MigrationInterface {
  name = 'StockTrackingSetup1697106220475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."stock_type_enum" AS ENUM('add', 'remove', 'reset')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."stock_reason_enum" AS ENUM('received', 'sold', 'return', 'expired', 'damaged', 'theft', 're-count')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "stockQuantity" integer NOT NULL, "balance" integer NOT NULL, "type" "public"."stock_type_enum" NOT NULL, "reason" "public"."stock_reason_enum" NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "transactionId" uuid, "variantId" uuid, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_category" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.836Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_category" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.836Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.864Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.864Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.878Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.878Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_item" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.878Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_item" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.878Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "variant" ADD "availableForSale" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "variant" ADD "stockTracking" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "variant" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.878Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "variant" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.878Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.878Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT '"2023-10-12T10:23:42.878Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ADD CONSTRAINT "FK_7768cbde33be3f7727b82c58ff3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ADD CONSTRAINT "FK_aa5e539cb5a722771af5bfe2ae1" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" ADD CONSTRAINT "FK_6d339d8c94554cdb8c4107218d9" FOREIGN KEY ("variantId") REFERENCES "variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock" DROP CONSTRAINT "FK_6d339d8c94554cdb8c4107218d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" DROP CONSTRAINT "FK_aa5e539cb5a722771af5bfe2ae1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock" DROP CONSTRAINT "FK_7768cbde33be3f7727b82c58ff3"`,
    );
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "createdDate"`);
    await queryRunner.query(`ALTER TABLE "variant" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "variant" DROP COLUMN "createdDate"`);
    await queryRunner.query(
      `ALTER TABLE "variant" DROP COLUMN "stockTracking"`,
    );
    await queryRunner.query(
      `ALTER TABLE "variant" DROP COLUMN "availableForSale"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_item" DROP COLUMN "updatedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_item" DROP COLUMN "createdDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "updatedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP COLUMN "createdDate"`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updatedDate"`);
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createdDate"`);
    await queryRunner.query(
      `ALTER TABLE "item_category" DROP COLUMN "updatedDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_category" DROP COLUMN "createdDate"`,
    );
    await queryRunner.query(`DROP TABLE "stock"`);
    await queryRunner.query(`DROP TYPE "public"."stock_reason_enum"`);
    await queryRunner.query(`DROP TYPE "public"."stock_type_enum"`);
  }
}
