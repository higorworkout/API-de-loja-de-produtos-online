import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import { compare, hash } from 'bcryptjs';
import CustomerRepository from "../infra/typeorm/repositories/CustomersRepositories";
import Customer from "../infra/typeorm/entities/Customer";
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { inject, injectable } from "tsyringe";



@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}


  public async execute({ id, name, email } : IUpdateCustomer): Promise<Customer> {

      const customer = await this.customersRepository.findById(id);

      if(!customer) {
        throw new AppError('Customer not found');
      }

      const customerExists = await this.customersRepository.findByEmail(email);

      if( customerExists && customerExists.email !== email) {
        throw new AppError('There is already one customer with this email.');
      }


      customer.name = name;
      customer.email = email;

      await this.customersRepository.save(customer);

      return customer;
  }
}


export default UpdateCustomerService
