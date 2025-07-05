import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerLocation } from '../customer-location.entity';
import { CreateCustomerLocationInput, CustomerLocationType } from './dto';

@Resolver()
export class CustomerLocationResolver {
  constructor(
    @InjectRepository(CustomerLocation)
    private locationRepo: Repository<CustomerLocation>,
  ) {}

  @Mutation(() => CustomerLocationType)
  async createCustomerLocation(
    @Args('input') input: CreateCustomerLocationInput,
  ): Promise<CustomerLocation> {
    const location = this.locationRepo.create(input);
    return this.locationRepo.save(location);
  }

  @Query(() => [CustomerLocationType])
  async customerLocations(): Promise<CustomerLocation[]> {
    return this.locationRepo.find();
  }
}
