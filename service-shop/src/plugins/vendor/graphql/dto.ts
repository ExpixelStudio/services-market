import { InputType, Field, Float, ObjectType, ID } from '@nestjs/graphql';


@InputType()
export class CreateVendorInput {
  @Field() name: string;
  @Field() contactNumber: string;
  @Field() address: string;
  @Field(() => Float) gpsLat: number;
  @Field(() => Float) gpsLng: number;
  @Field() isOpen: boolean;
  @Field() businessType: string;
  @Field() deliveryAvailable: boolean;
}

@ObjectType()
export class VendorType {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() contactNumber: string;
  @Field() address: string;
  @Field(() => Float) gpsLat: number;
  @Field(() => Float) gpsLng: number;
  @Field() isOpen: boolean;
  @Field() businessType: string;
  @Field() deliveryAvailable: boolean;
}
