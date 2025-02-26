import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn } from "typeorm";
import Order from "./Order";
import Product from "@modules/products/infra/typeorm/entities/Product";
import { IOrderProducts } from "@modules/orders/domain/models/IOrderProducts";

@Entity('orders_products')
class OrderProducts implements IOrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({name: 'order_id'})
  order: Order;

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({name: 'product_id'})
  product: Product;

  @Column('decimal')
  order_id: string;

  @Column('decimal')
  product_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderProducts;
