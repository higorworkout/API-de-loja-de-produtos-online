import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/reposities/ProductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import IProductRepository from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";
import { IUpdateProduct } from "../domain/models/IUpdateProduct";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository) {}

  public async execute({ id, name, price, quantity }: IUpdateProduct): Promise<IProduct> {
      const productsRepository = getCustomRepository(ProductRepository);

      const product = await this.productRepository.findById(id);

    if(!product) {
      throw new AppError('Product don\'t found.')
    }


      const productExists = await this.productRepository.findByName(name);

      if(productExists && name !== product.name) {
        throw new AppError('There is already one product with this name');
      }


    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

      product.name = name;
      product.price = price;
      product.quantity = quantity;

      await this.productRepository.save(product);

      return product;
  }
}


export default UpdateProductService
