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

@InputType()
export class VendorItemSearchInput {
  @Field({ nullable: true }) keyword?: string;

  @Field({ nullable: true }) available?: boolean;      // filter by item availability
  @Field({ nullable: true }) type?: string;            // "FOOD", "SERVICE", etc.
  @Field({ nullable: true }) isVendorOpen?: boolean;   // filters by vendor.isOpen
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
