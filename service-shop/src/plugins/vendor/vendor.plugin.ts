import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import gql from "graphql-tag";
import { Vendor } from "./vendor.entity";
import { VendorResolver } from "./graphql/vendor.resolver";

@VendurePlugin({
  imports: [PluginCommonModule, TypeOrmModule.forFeature([Vendor])],
  entities: [Vendor],
  providers: [VendorResolver],
  adminApiExtensions: {
    schema: gql`
      extend type Query {
        vendors: [Vendor!]!
      }

      extend type Mutation {
        createVendor(input: CreateVendorInput!): Vendor!
      }

      input CreateVendorInput {
        name: String!
        contactNumber: String!
        address: String!
        gpsLat: Float!
        gpsLng: Float!
        isOpen: Boolean!
        businessType: String!
        deliveryAvailable: Boolean!
      }

      type Vendor {
        id: ID!
        name: String!
        contactNumber: String!
        address: String!
        gpsLat: Float!
        gpsLng: Float!
        isOpen: Boolean!
        businessType: String!
        deliveryAvailable: Boolean!
      }
    `,
    resolvers: [VendorResolver],
  },
})
export class VendorPlugin {}
