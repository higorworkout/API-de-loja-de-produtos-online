
import AppError from "@shared/errors/AppError";
import IProductRepository from "../domain/repositories/IProductRepository";
import { IShowProduct } from "../domain/models/IShowProduct";
import { IProduct } from "../domain/models/IProduct";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductRepository) {}

  public async execute({ id }: IShowProduct): Promise<IProduct | undefined> {

      const product = await this.productRepository.findById(id);

    if(!product) {
      throw new AppError('Product don\'t found.')
    }
      return product;
  }
}


export default ShowProductService
