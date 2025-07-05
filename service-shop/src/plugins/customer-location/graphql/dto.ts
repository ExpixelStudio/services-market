import { Field, Float, InputType, ObjectType, ID } from '@nestjs/graphql';

@InputType()
export class CreateCustomerLocationInput {
  @Field() name: string;
  @Field() address: string;
  @Field(() => Float) gpsLat: number;
  @Field(() => Float) gpsLng: number;
}

@ObjectType()
export class CustomerLocationType {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() address: string;
  @Field(() => Float) gpsLat: number;
  @Field(() => Float) gpsLng: number;
}
