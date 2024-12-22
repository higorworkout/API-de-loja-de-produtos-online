import AppError from "@shared/errors/AppError";
import RedisCache from "@shared/cache/RedisCache";
import IProductRepository from "../domain/repositories/IProductRepository";
import { IDeleteProduct } from "../domain/models/IDeleteProduct";
import { inject, injectable } from "tsyringe";



@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository
  ) {}


  public async execute({ id }: IDeleteProduct): Promise<void> {
      const product = await this.productRepository.findById(id);

    if(!product) {
      throw new AppError('Product don\'t found.')
    }


    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await this.productRepository.remove(product);

  }
}


export default DeleteProductService
