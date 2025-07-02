import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../vendor.entity';
import { CreateVendorInput, VendorType } from './dto';

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
}
