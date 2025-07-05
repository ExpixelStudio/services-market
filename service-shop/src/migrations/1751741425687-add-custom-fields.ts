import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCustomFields1751741425687 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "customer_location" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "address" varchar NOT NULL, "gpsLat" float NOT NULL, "gpsLng" float NOT NULL)`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "customer_location"`, undefined);
   }

}
