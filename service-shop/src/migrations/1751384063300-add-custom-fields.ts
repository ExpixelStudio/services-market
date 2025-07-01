import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomFields1751384063300 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "identifier" varchar NOT NULL, "verified" boolean NOT NULL DEFAULT (0), "lastLogin" datetime, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customFieldsVendor" varchar(255), "customFieldsGpslocation" varchar(255))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("createdAt", "updatedAt", "deletedAt", "identifier", "verified", "lastLogin", "id") SELECT "createdAt", "updatedAt", "deletedAt", "identifier", "verified", "lastLogin", "id" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "identifier" varchar NOT NULL, "verified" boolean NOT NULL DEFAULT (0), "lastLogin" datetime, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "user"("createdAt", "updatedAt", "deletedAt", "identifier", "verified", "lastLogin", "id") SELECT "createdAt", "updatedAt", "deletedAt", "identifier", "verified", "lastLogin", "id" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
   }

}
