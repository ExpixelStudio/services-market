import { Field, Float, InputType, ObjectType, ID } from '@nestjs/graphql';

// VendorType is used in vendor plugin and customer plugin.
// CustomerCoordinatesInput is used in customer plugin.
// NearbyVendor is used in customer plugin. 
// This is to get the vendor distance from the customer location.

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
