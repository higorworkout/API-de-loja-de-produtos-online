import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import OrdersRepository from "../infra/typeorm/repositories/OrdersRepository";
import Product from "@modules/products/infra/typeorm/entities/Product";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import IShowOrder from "../domain/models/IShowOrder";
import { IOrder } from "../domain/models/IOrder";
import { inject, injectable } from "tsyringe";




@injectable()
class ShowOrderService {

  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository 
  ){}

  public async execute({ id }: IShowOrder): Promise<IOrder> {
      const order = await this.ordersRepository.findById(id);

      if(!order) {

        throw new AppError('Order not found');
      }


      return order;
  }
}


export default ShowOrderService
