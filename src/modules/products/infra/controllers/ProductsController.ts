import { container } from "tsyringe";
import CreateProductService from "../../services/CreateProductService";
import DeleteProductService from "../../services/DeleteProductService";
import ListProductService from "../../services/ListProductservice";
import UpdateProductService from "../../services/UpdateProductService";
import ShowProductService from "../../services/showProductService";
import { Request, Response } from 'express';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
     const page = request.query.page ? Number(request.query.page) : 1;
     const limit = request.query.limit ? Number(request.query.limit) : 15;

      const listProducts = container.resolve(ListProductService);

      const products = await listProducts.execute({ page, limit});

      return response.json(products);
  }


  public async show(request: Request, response: Response): Promise<Response>  {
     const { id } = request.params;


     const showProduct = container.resolve(ShowProductService);

     const product = await showProduct.execute({ id });

     return response.json(product);
  }


  public async create(request: Request, response: Response):  Promise<Response> {
    const {name, price, quantity} = request.body;
    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity
      });


    return response.json(product);
  }


  public async update(request: Request, response: Response):  Promise<Response> {

    const {name, price, quantity} = request.body;
    const { id } = request.params;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    })

    return response.json(product);
  }

  public async delete(request: Request, response: Response):  Promise<Response> {

    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id })

    return response.json([]);
  }
}
