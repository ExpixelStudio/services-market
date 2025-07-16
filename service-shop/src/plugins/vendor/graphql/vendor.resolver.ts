import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../vendor.entity';
import { CreateVendorInput} from './dto';
import { VendorType} from '../../shared/graphql-types/vendor-customer-shared.dto';


//Implementation of Haversine distance calculation (inline version) kept for reference. But the utils/geoDistance.ts file is used instead.
// Haversine distance calculation (inline version)
/* function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
} */


@Resolver()
export class VendorResolver {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  @Query(() => [VendorType])
  async vendors(): Promise<Vendor[]> {
    return this.vendorRepo.find();
  }

  @Mutation(() => VendorType)
  async createVendor(
    @Args('input') input: CreateVendorInput,
  ): Promise<Vendor> {
   // Safely create and save vendor
   // create() instantiates a new entity object.
   // If input includes an id, it'll be treated as an update.
   // If input.id is undefined, it's treated as a new record (INSERT).
   const newVendor = this.vendorRepo.create(input);
   return await this.vendorRepo.save(newVendor);
   // This avoids the TypeORM crash caused when .save() is called directly on an object missing a required primary key for updates.
  }
  

  // Nearby vendor logic moved to customer-location plugin.
}
