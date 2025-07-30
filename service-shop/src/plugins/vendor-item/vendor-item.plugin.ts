import { VendurePlugin, PluginCommonModule } from '@vendure/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import gql from 'graphql-tag';

import { VendorItem } from './vendor-item.entity';
import { VendorItemResolver } from './graphql/vendor-item.resolver';
import { Vendor } from '../vendor/vendor.entity'; // required for resolver injection

@VendurePlugin({
  imports: [
    PluginCommonModule,
    TypeOrmModule.forFeature([VendorItem, Vendor]) // Registers VendorItem and Vendor entities
  ],
  entities: [VendorItem],
  providers: [VendorItemResolver],
  adminApiExtensions: {
    schema: gql`
      extend type Mutation {
        createVendorItem(input: CreateVendorItemInput!): VendorItem!
      }

      extend type Query {
        getVendorItems: [VendorItem!]!
        getVendorItemsByVendor(vendorId: Int!): [VendorItem!]!
      }

      input CreateVendorItemInput {
        name: String!
        description: String!
        price: Float!
        imageUrl: String
        category: String
        type: String
        available: Boolean
        tags: [String]
        vendorId: ID!
      }

      type VendorItem {
        id: ID!
        name: String!
        description: String!
        price: Float!
        imageUrl: String
        category: String
        type: String
        available: Boolean!
        tags: [String]
        vendor: Vendor!
      }
    `,
    resolvers: [VendorItemResolver],
  },
})
export class VendorItemPlugin {}
