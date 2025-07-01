import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomFields1751404077482 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_vendor" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactNumber" varchar NOT NULL, "address" varchar NOT NULL, "gpsLat" float NOT NULL, "gpsLng" float NOT NULL, "isOpen" boolean NOT NULL DEFAULT (1), "businessType" varchar NOT NULL, "deliveryAvailable" boolean NOT NULL DEFAULT (0))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_vendor"("id", "name", "contactNumber", "address", "gpsLat", "gpsLng", "isOpen", "businessType", "deliveryAvailable") SELECT "id", "name", "contactNumber", "address", "gpsLat", "gpsLng", "isOpen", "businessType", "deliveryAvailable" FROM "vendor"`, undefined);
        await queryRunner.query(`DROP TABLE "vendor"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_vendor" RENAME TO "vendor"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "vendor" RENAME TO "temporary_vendor"`, undefined);
        await queryRunner.query(`CREATE TABLE "vendor" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactNumber" varchar NOT NULL, "address" varchar NOT NULL, "gpsLat" float NOT NULL, "gpsLng" float NOT NULL, "isOpen" boolean NOT NULL DEFAULT (1), "businessType" varchar NOT NULL, "deliveryAvailable" boolean NOT NULL DEFAULT (0))`, undefined);
        await queryRunner.query(`INSERT INTO "vendor"("id", "name", "contactNumber", "address", "gpsLat", "gpsLng", "isOpen", "businessType", "deliveryAvailable") SELECT "id", "name", "contactNumber", "address", "gpsLat", "gpsLng", "isOpen", "businessType", "deliveryAvailable" FROM "temporary_vendor"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_vendor"`, undefined);
   }

}
