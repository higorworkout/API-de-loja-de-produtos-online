import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomersRepositories";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";


interface IRequest {
  id: string
}

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id } : IRequest): Promise<Customer> {
      const customerRepository = getCustomRepository(CustomerRepository);

      const customer = await customerRepository.findById(id);

      if(!customer) {
        throw new AppError('User not found');
      }

      return customer;
  }
}


export default ShowCustomerService
