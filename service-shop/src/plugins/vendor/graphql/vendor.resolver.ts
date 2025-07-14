import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../vendor.entity';
import { CreateVendorInput, CustomerCoordinatesInput, NearbyVendor, VendorType } from './dto';

import { haversineDistance } from '../utils/geoDistance'; // ✅ Haversine distance calculation from utils folder

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
  

  @Query(() => [NearbyVendor])
async getNearbyVendors(
  @Args('input') input: CustomerCoordinatesInput,
): Promise<NearbyVendor[]> {
  const vendors = await this.vendorRepo.find();

  const results = vendors.map((vendor) => {
    const distance = haversineDistance(
      input.gpsLat,
      input.gpsLng,
      vendor.gpsLat,
      vendor.gpsLng
    );

   // 🛠️ Convert `vendor` entity to VendorType explicitly
  const vendorType: VendorType = {
    id: vendor.id,
    name: vendor.name,
    contactNumber: vendor.contactNumber,
    address: vendor.address,
    gpsLat: vendor.gpsLat,
    gpsLng: vendor.gpsLng,
    isOpen: vendor.isOpen,
    businessType: vendor.businessType,
    deliveryAvailable: vendor.deliveryAvailable,
  };

    return {
      vendor,
      distance,
    };
  });

  // Optional: sort by closest first
  return results.sort((a, b) => a.distance - b.distance);
}

}
