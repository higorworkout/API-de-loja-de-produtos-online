import { ICreateProduct } from "../models/ICreateProduct";
import { IFindProducts } from "../models/IFindProducts";
import { IProduct } from "../models/IProduct";
import { IProductPaginate } from "../models/IProductPaginate";
import { IUpdateStockProduct } from "../models/IUpdateStockProduct";

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default interface IProductRepository {
    findByName(name: string): Promise<IProduct | undefined>;
    findById(id: string): Promise<IProduct | undefined>;
    findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate>;
    save(product: IProduct): Promise<IProduct>
    create(data: ICreateProduct): Promise<IProduct>;
    updateStock(products: IUpdateStockProduct[]): Promise<void>;
    findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
    remove(product: IProduct): Promise<void>;
} 