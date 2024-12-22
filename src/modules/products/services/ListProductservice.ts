import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/Product";
import RedisCache from "@shared/cache/RedisCache";
import IProductRepository from "../domain/repositories/IProductRepository";
import { IProduct } from "../domain/models/IProduct";
import { IProductPaginate } from "../domain/models/IProductPaginate";
import { inject, injectable } from "tsyringe";

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository) {}


  public async execute({ page, limit }: SearchParams): Promise<IProductPaginate > {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    // const redisCache = new RedisCache();

    // let products = await redisCache.recover<IProduct[]>('api-vendas-PRODUCT_LIST')

    // if(!products) {
      const products = await this.productRepository.findAll({
      page,
      skip,
      take,
    });

     //    await redisCache.save('api-vendas-PRODUCT_LIST', products)
    // }

      return products;
  }
}


export default ListProductService

