import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVendorItemPlugin1753909237532 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "vendor_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" float NOT NULL, "imageUrl" varchar, "category" varchar, "type" varchar, "available" boolean NOT NULL DEFAULT (1), "tags" text, "vendorId" integer NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_vendor_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" float NOT NULL, "imageUrl" varchar, "category" varchar, "type" varchar, "available" boolean NOT NULL DEFAULT (1), "tags" text, "vendorId" integer NOT NULL, CONSTRAINT "FK_493a596a13d52eb322039733600" FOREIGN KEY ("vendorId") REFERENCES "vendor" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_vendor_item"("id", "name", "description", "price", "imageUrl", "category", "type", "available", "tags", "vendorId") SELECT "id", "name", "description", "price", "imageUrl", "category", "type", "available", "tags", "vendorId" FROM "vendor_item"`, undefined);
        await queryRunner.query(`DROP TABLE "vendor_item"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_vendor_item" RENAME TO "vendor_item"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "vendor_item" RENAME TO "temporary_vendor_item"`, undefined);
        await queryRunner.query(`CREATE TABLE "vendor_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" float NOT NULL, "imageUrl" varchar, "category" varchar, "type" varchar, "available" boolean NOT NULL DEFAULT (1), "tags" text, "vendorId" integer NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "vendor_item"("id", "name", "description", "price", "imageUrl", "category", "type", "available", "tags", "vendorId") SELECT "id", "name", "description", "price", "imageUrl", "category", "type", "available", "tags", "vendorId" FROM "temporary_vendor_item"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_vendor_item"`, undefined);
        await queryRunner.query(`DROP TABLE "vendor_item"`, undefined);
   }

}
