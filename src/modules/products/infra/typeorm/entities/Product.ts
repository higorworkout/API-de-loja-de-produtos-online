import OrderProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { IProduct } from '@modules/products/domain/models/IProduct';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrderProducts, order_products => order_products.product, {
    cascade: true,
  })
  order_products: OrderProducts[];

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
