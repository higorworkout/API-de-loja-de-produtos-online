import { Request, Response } from 'express';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import CreateCustomerService from '../../../services/CreateCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import { container } from 'tsyringe';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
      const page = request.query.page ? Number(request.query.page) : 1;
      const limit = request.query.limit ? Number(request.query.limit) : 15;

      const listCustomers = container.resolve(ListCustomerService);

      const customers = await listCustomers.execute({ page, limit});

      return response.json(customers);
  }


  public async show(request: Request, response: Response): Promise<Response>  {
     const { id } = request.params;


     const showCustomers = container.resolve(ShowCustomerService);

     const customer = await showCustomers.execute({ id });

     return response.json(customer);
  }


  public async create(request: Request, response: Response):  Promise<Response> {
    const {name, email} = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email
      });


    return response.json(customer);
  }


  public async update(request: Request, response: Response):  Promise<Response> {

    const {name, email} = request.body;
    const { id } = request.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      id,
      name,
      email
    })

    return response.json(customer);
  }

  public async delete(request: Request, response: Response):  Promise<Response> {

    const { id } = request.params;



    const deleteCustomer =  container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id })

    return response.json([]);
  }
}
