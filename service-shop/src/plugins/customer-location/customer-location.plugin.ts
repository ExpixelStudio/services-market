import { VendurePlugin, PluginCommonModule } from "@vendure/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import gql from "graphql-tag";
import { CustomerLocation } from "./customer-location.entity";
import { CustomerLocationResolver } from "./graphql/customer-location.resolver";
import { Vendor } from "../vendor/vendor.entity"; // Needed to query all vendors to calculate proximity to customer

@VendurePlugin({
  imports: [
    PluginCommonModule,
    TypeOrmModule.forFeature([CustomerLocation, Vendor]),  //Vendor needed for repository injection
  ],
  entities: [CustomerLocation],
  providers: [CustomerLocationResolver],
  adminApiExtensions: {
    schema: gql`
      extend type Query {
        customerLocations: [CustomerLocation!]!
        getNearbyVendors(input: CustomerCoordinatesInput!): [NearbyVendor!]!
      }

      extend type Mutation {
        createCustomerLocation(
          input: CreateCustomerLocationInput!
        ): CustomerLocation!
      }

      input CreateCustomerLocationInput {
        name: String!
        address: String!
        gpsLat: Float!
        gpsLng: Float!
      }

      type CustomerLocation {
        id: ID!
        name: String!
        address: String!
        gpsLat: Float!
        gpsLng: Float!
      }

      input CustomerCoordinatesInput {
        gpsLat: Float!
        gpsLng: Float!
      }

      type NearbyVendor {
        vendor: Vendor!
        distance: Float!
      }
    `,
    resolvers: [CustomerLocationResolver],
  },
})
export class CustomerLocationPlugin {}
