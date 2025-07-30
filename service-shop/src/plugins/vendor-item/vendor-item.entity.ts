import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vendor } from '../vendor/vendor.entity';

@Entity()
export class VendorItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  type?: string; // "FOOD" | "PRODUCT" | "SERVICE"

  @Column({ default: true })
  available: boolean;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @ManyToOne(() => Vendor, { nullable: false })
  vendor: Vendor;
}
