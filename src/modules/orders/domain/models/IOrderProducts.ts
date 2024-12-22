import { IOrder } from "./IOrder";

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  create_at: Date;
  updated_at: Date;
}
