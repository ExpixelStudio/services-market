//import { VendureEntity } from '@vendure/core';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactNumber: string;

  @Column()
  address: string;

  @Column('float')
  gpsLat: number;

  @Column('float')
  gpsLng: number;

  @Column({ default: true })
  isOpen: boolean;

  @Column()
  businessType: string;

  @Column({ default: false })
  deliveryAvailable: boolean;


  /* //Add constructor to ensure VendureEntity is initialized
  // This is not needed if are not using extends VendureEntity
  constructor() {
    super();
  } */
}
