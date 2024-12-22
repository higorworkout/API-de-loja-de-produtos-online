import { IProduct } from "./IProduct";

export interface IProductPaginate {
    per_page: number;
    current_page: number;
    data: IProduct[];
}