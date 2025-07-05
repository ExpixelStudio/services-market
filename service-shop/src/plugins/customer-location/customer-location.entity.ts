import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CustomerLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('float')
  gpsLat: number;

  @Column('float')
  gpsLng: number;
}
