import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import OrdersRepository from "../infra/typeorm/repositories/OrdersRepository";
import CustomerRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepositories";
import { ProductRepository } from "@modules/products/infra/typeorm/reposities/ProductsRepository";
import Product from "@modules/products/infra/typeorm/entities/Product";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import IProductRepository from "@modules/products/domain/repositories/IProductRepository";
import { IOrder } from "../domain/models/IOrder";
import { inject, injectable } from "tsyringe";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {

    constructor(
      @inject('OrdersRepository')
      private ordersRepository: IOrdersRepository,

      @inject('CustomersRepository')
      private customersRepository: ICustomersRepository,

      @inject('ProductsRepository')
      private productsRepository: IProductRepository
    ){}

  public async execute({customer_id, products}: IRequest): Promise<IOrder | undefined> {


      const customerExists = await this.customersRepository.findById(customer_id);

      if(!customerExists) {

        throw new AppError('It couldn\'t find any customer with the given id.');
      }

      const existsProducts = await this.productsRepository.findAllByIds(products);

      if(!existsProducts.length) {
        throw new AppError('It couldn\'t find any products with the given ids.');
      }

      const existsProductsIds = existsProducts.map((product) => product.id);

      const checkInexistentProducts = products.filter(
        product => !existsProductsIds.includes(product.id)
      )

      if(checkInexistentProducts.length) {
        throw new AppError(`It couldn\'t find any products ${checkInexistentProducts[0].id}.`);
      }

      const quantityAvailable = products.filter(
        product => existsProducts.filter(
          p => p.id === product.id
        )[0].quantity < product.quantity,
      );

      if(quantityAvailable.length) {
        throw new AppError(`It couldn\'t find any products ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`);
      }

      const serializedProducts = products.map(
        product => ({
          product_id: product.id,
          quantity: product.quantity,
          price: existsProducts.filter(p => p.id === product.id)[0].price
        })
      );

      const order = await this.ordersRepository.create({
        customer: customerExists,
        products: serializedProducts
      })

      const { order_products } = order;

      const updatedProductQuantity = order_products.map(
        product => ({
          id: product.product_id,
          quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
        })
      )

      await this.productsRepository.updateStock(updatedProductQuantity)

      return order;
  }
}


export default CreateOrderService
