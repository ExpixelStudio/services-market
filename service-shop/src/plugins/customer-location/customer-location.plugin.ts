import { VendurePlugin, PluginCommonModule } from '@vendure/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import gql from 'graphql-tag';
import { CustomerLocation } from './customer-location.entity';
import { CustomerLocationResolver } from './graphql/customer-location.resolver';

@VendurePlugin({
  imports: [PluginCommonModule, TypeOrmModule.forFeature([CustomerLocation])],
  entities: [CustomerLocation],
  providers: [CustomerLocationResolver],
  adminApiExtensions: {
    schema: gql`
      extend type Mutation {
        createCustomerLocation(input: CreateCustomerLocationInput!): CustomerLocation!
      }

      extend type Query {
        customerLocations: [CustomerLocation!]!
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
    `,
    resolvers: [CustomerLocationResolver],
  },
})
export class CustomerLocationPlugin {}
