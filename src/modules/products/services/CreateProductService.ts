import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import IProductRepository from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { inject, injectable } from "tsyringe";



@injectable()
class CreateProductService {

  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({name, price, quantity}: ICreateProduct): Promise<IProduct> {
      const productExists = await this.productRepository.findByName(name);


      if(productExists) {

        throw new AppError('There is already one product with this name');
      }


     const redisCache = new RedisCache();

      const product = await this.productRepository.create({
        name,
        price,
        quantity
      })

      await redisCache.invalidate('api-vendas-PRODUCT_LIST')

      await this.productRepository.save(product);

      return product;
  }
}


export default CreateProductService
