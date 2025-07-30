import { Field, Float, ID, InputType, ObjectType } from '@nestjs/graphql';
import { VendorType } from '../../../plugins/shared/graphql-types/vendor-customer-shared.dto';

@InputType()
export class CreateVendorItemInput {
  @Field() name: string;
  @Field() description: string;
  @Field(() => Float) price: number;

  @Field({ nullable: true }) imageUrl?: string;
  @Field({ nullable: true }) category?: string;
  @Field({ nullable: true }) type?: string;
  @Field({ nullable: true }) available?: boolean;
  @Field(() => [String], { nullable: true }) tags?: string[];

  @Field(() => ID) vendorId: number;
}

@ObjectType()
export class VendorItemType {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field() description: string;
  @Field(() => Float) price: number;

  @Field({ nullable: true }) imageUrl?: string;
  @Field({ nullable: true }) category?: string;
  @Field({ nullable: true }) type?: string;
  @Field() available: boolean;
  @Field(() => [String], { nullable: true }) tags?: string[];

  @Field(() => VendorType) vendor: VendorType;
}
