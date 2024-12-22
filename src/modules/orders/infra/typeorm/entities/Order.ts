
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrderProducts from "./OrdersProducts";
import { IOrder } from "@modules/orders/domain/models/IOrder";

@Entity('orders')
class Order implements IOrder{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({name: 'customer_id'})
  customer: Customer;

  @OneToMany(() => OrderProducts, order_products => order_products.order)
  order_products: OrderProducts[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
