import { EntityRepository, getRepository, In, Repository } from "typeorm";
import Product from "../entities/Product";
import IProductRepository from "@modules/products/domain/repositories/IProductRepository";
import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { SearchParams } from "@modules/customers/domain/repositories/ICustomersRepository";
import { IUpdateStockProduct } from "@modules/products/domain/models/IUpdateStockProduct";
import { IProductPaginate } from "@modules/products/domain/models/IProductPaginate";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { IFindProducts } from "@modules/products/domain/models/IFindProducts";



@EntityRepository(Product)
export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
      const product = this.ormRepository.create({ name, price, quantity});

      await this.ormRepository.save(product);
      
      return product;
  }

  async findByName(name: string): Promise<Product | undefined> {
      const product = this.ormRepository.findOne({
         where: {
           name
         }
      })

      return product;
    }

    public async save(product: Product): Promise<Product> {
       await this.ormRepository.save(product);

       return product;
    }

    public async remove(product: Product): Promise<void> {
       await this.ormRepository.remove(product);
    }

    public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
        await this.ormRepository.save(products);
    }

    public async findById(id: string): Promise<IProduct | undefined> {
       const product = this.ormRepository.findOne({
        where: {
          id
        }
       });

       return product;
    }

    public async findAll({
      page,
      skip,
      take,
    }: SearchParams): Promise<IProductPaginate> {
       const [
        products,
        count, 
       ] = await this.ormRepository
       .createQueryBuilder()
       .skip(skip)
       .take(take)
       .getManyAndCount();

       const result = {
        per_page: take,
        total: count,
        current_page: page,
        data: products
       }

       return result;
    }

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
      const productIds = products.map(product => product.id);

      const existsProducts = await this.ormRepository.find({
        where: {
          id: In(productIds),
        }
      })
      return existsProducts
   }
}
