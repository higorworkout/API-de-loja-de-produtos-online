
import { EntityRepository, getRepository, Repository } from "typeorm";
import Order from "../entities/Order";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import { IOrderPaginate } from "@modules/orders/domain/models/IOrderPaginate";

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};


export default class OrdersRepository implements IOrdersRepository {

      private ormRepository: Repository<Order>;

      constructor() {
         this.ormRepository = getRepository(Order);
      }


  async findById(id: string): Promise<Order | undefined> {
      const order = await this.ormRepository.findOne({
        where: { id },
        relations: ['order_products', 'customer'],
      })

      return order;
   }

   public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IOrderPaginate> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: orders,
    };

    return result;
  }




  
  public async create({customer, products}: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    })

    await this.ormRepository.save(order);

    return order;
  }


}
