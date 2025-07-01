import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { VendorResolver } from './graphql/vendor.resolver';

@VendurePlugin({
  imports: [PluginCommonModule, TypeOrmModule.forFeature([Vendor])],
  entities: [Vendor], //Registers your Vendor entity with the DB
  providers: [VendorResolver],
})
export class VendorPlugin {}
