import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerLocation } from '../customer-location.entity';
import { CreateCustomerLocationInput, CustomerLocationType } from './dto';
import { NearbyVendor, CustomerCoordinatesInput ,VendorType } from '../../shared/graphql-types/vendor-customer-shared.dto';
import { Vendor } from '../../vendor/vendor.entity'; // Needed to query all vendors
import { haversineDistance } from '../../vendor/utils/geoDistance'; //

@Resolver()
export class CustomerLocationResolver {
  constructor(
    @InjectRepository(CustomerLocation)
    private locationRepo: Repository<CustomerLocation>,

    @InjectRepository(Vendor) // Needed to query all vendors to calculate proximity to customer
    private vendorRepo: Repository<Vendor>,
  ) {}


  @Mutation(() => CustomerLocationType)
  async createCustomerLocation(
    @Args('input') input: CreateCustomerLocationInput,
  ): Promise<CustomerLocation> {
    const location = this.locationRepo.create(input);
    return this.locationRepo.save(location);
  }

  @Query(() => [CustomerLocationType]) // Query all customer locations (for debugging or admin view)
  async customerLocations(): Promise<CustomerLocation[]> {
    return this.locationRepo.find();
  }

  @Query(() => [NearbyVendor])
async getNearbyVendors(
  @Args('input') input: CustomerCoordinatesInput,
): Promise<NearbyVendor[]> {
  const vendors = await this.vendorRepo.find();

  // Apply optional filters BEFORE distance calculation
  const filteredVendors = vendors.filter((vendor) => {
    if (input.isOpen !== undefined && vendor.isOpen !== input.isOpen) return false;
    if (input.deliveryAvailable !== undefined && vendor.deliveryAvailable !== input.deliveryAvailable) return false;
    if (input.businessType && vendor.businessType !== input.businessType) return false;
    return true;
  });

  const results = filteredVendors.map((vendor) => {
    const distance = haversineDistance(
      input.gpsLat,
      input.gpsLng,
      vendor.gpsLat,
      vendor.gpsLng
    );

   // Convert `vendor` entity to VendorType explicitly
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
      vendor: vendorType,
      distance,
    };
  });

  // Optional: sort by closest first
  return results.sort((a, b) => a.distance - b.distance);
}

}
