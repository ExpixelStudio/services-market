import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomFields1751395897995 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "vendor" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "contactNumber" varchar NOT NULL, "address" varchar NOT NULL, "gpsLat" float NOT NULL, "gpsLng" float NOT NULL, "isOpen" boolean NOT NULL DEFAULT (1), "businessType" varchar NOT NULL, "deliveryAvailable" boolean NOT NULL DEFAULT (0))`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "identifier" varchar NOT NULL, "verified" boolean NOT NULL DEFAULT (0), "lastLogin" datetime, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("createdAt", "updatedAt", "deletedAt", "identifier", "verified", "lastLogin", "id") SELECT "createdAt", "updatedAt", "deletedAt", "identifier", "verified", "lastLogin", "id" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_91a19e6613534949a4ce6e76ff"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "customFieldsVendor" varchar(255), "customFieldsGpslocation" varchar(255), CONSTRAINT "FK_91a19e6613534949a4ce6e76ff8" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product"("createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId" FROM "product"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_91a19e6613534949a4ce6e76ff" ON "product" ("featuredAssetId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_91a19e6613534949a4ce6e76ff"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, CONSTRAINT "FK_91a19e6613534949a4ce6e76ff8" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "product"("createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId" FROM "temporary_product"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_91a19e6613534949a4ce6e76ff" ON "product" ("featuredAssetId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "identifier" varchar NOT NULL, "verified" boolean NOT NULL DEFAULT (0), "lastLogin" datetime, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customFieldsVendor" varchar(255), "customFieldsGpslocation" varchar(255))`, undefined);
        await queryRunner.query(`INSERT INTO "user"("createdAt", "updatedAt", "deletedAt", "identifier", "verified", "lastLogin", "id") SELECT "createdAt", "updatedAt", "deletedAt", "identifier", "verified", "lastLogin", "id" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "vendor"`, undefined);
   }

}
