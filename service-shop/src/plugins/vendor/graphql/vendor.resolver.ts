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
    const vendor = this.vendorRepo.create(input);
    return this.vendorRepo.save(vendor);
  }
}
