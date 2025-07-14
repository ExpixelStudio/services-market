import { InputType, Field, Float, ObjectType, ID } from '@nestjs/graphql';


@InputType()
export class CreateVendorInput {
  @Field() name: string;
  @Field() contactNumber: string;
  @Field() address: string;
  @Field(() => Float) gpsLat: number;
  @Field(() => Float) gpsLng: number;
  @Field(() => Float) customerGpsLat: number;
  @Field(() => Float) customerGpsLng: number;
  @Field() isOpen: boolean;
  @Field() businessType: string;
  @Field() deliveryAvailable: boolean;
}

@ObjectType()
export class VendorType {
  @Field(() => ID) id: number;
  @Field() name: string;
  @Field() contactNumber: string;
  @Field() address: string;
  @Field(() => Float) gpsLat: number;
  @Field(() => Float) gpsLng: number;
  @Field() isOpen: boolean;
  @Field() businessType: string;
  @Field() deliveryAvailable: boolean;
}

//This is for the customer to get the nearby vendors, so we need to pass the customer's coordinates. 
// It is used in the vendor.resolver.ts file.
@InputType('CustomerCoordinatesInput')
export class CustomerCoordinatesInput {
  @Field(() => Float) gpsLat: number;
  @Field(() => Float) gpsLng: number;
}

@ObjectType()
export class NearbyVendor {
  @Field(() => VendorType) vendor: VendorType;
  @Field(() => Float) distance: number;
}