import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VendorItem } from '../vendor-item.entity';
import { Vendor } from '../../vendor/vendor.entity';
import {
  CreateVendorItemInput,
  VendorItemSearchInput,
  VendorItemType,
} from './dto';

@Resolver()
export class VendorItemResolver {
  constructor(
    @InjectRepository(VendorItem)
    private itemRepo: Repository<VendorItem>,

    @InjectRepository(Vendor)
    private vendorRepo: Repository<Vendor>,
  ) {}

  @Mutation(() => VendorItemType)
  async createVendorItem(
    @Args('input') input: CreateVendorItemInput,
  ): Promise<VendorItem> {
    const vendor = await this.vendorRepo.findOneBy({ id: input.vendorId });
    if (!vendor) throw new Error(`Vendor with ID ${input.vendorId} not found`);

    const item = this.itemRepo.create({ ...input, vendor });
    return this.itemRepo.save(item);
  }

  @Query(() => [VendorItemType])
  async getVendorItems(): Promise<VendorItem[]> {
    return this.itemRepo.find({ relations: ['vendor'] });
  }

  @Query(() => [VendorItemType])
  async getVendorItemsByVendor(
    @Args('vendorId', { type: () => Number }) vendorId: number,
  ): Promise<VendorItem[]> {
    return this.itemRepo.find({
      where: { vendor: { id: vendorId } },
      relations: ['vendor'],
    });
  }

  @Query(() => [VendorItemType])
  async searchVendorItems(
    @Args('input') input: VendorItemSearchInput,
  ): Promise<VendorItem[]> {
    const allItems = await this.itemRepo.find({ relations: ['vendor'] });
  
    const keyword = input.keyword?.toLowerCase();
  
    return allItems.filter(item => {
      const matchesKeyword =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.tags?.some(tag => tag.toLowerCase().includes(keyword));
  
      const matchesAvailability =
        input.available === undefined || item.available === input.available;
  
      const matchesType =
        !input.type || item.type?.toLowerCase() === input.type.toLowerCase();
  
      const matchesVendorOpen =
        input.isVendorOpen === undefined ||
        item.vendor?.isOpen === input.isVendorOpen;
  
      return (
        matchesKeyword &&
        matchesAvailability &&
        matchesType &&
        matchesVendorOpen
      );
    });
  }
  

}
