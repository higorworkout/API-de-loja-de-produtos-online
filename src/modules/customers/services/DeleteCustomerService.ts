import AppError from "@shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { IDeleteCustomer } from "../domain/models/IDeleteCustomers";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}


  public async execute({ id } : IDeleteCustomer): Promise<[]> {

      const customer = await this.customersRepository.findById(id);

      if(!customer) {
        throw new AppError('User not found');
      }


      await this.customersRepository.remove(customer);

      return [];
  }
}


export default DeleteCustomerService
