import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomerPaginate } from "../domain/models/ICustomerPaginate";
import { inject, injectable } from "tsyringe";

// interface IPaginationCustomer {
  //from: number;
 // to: number;
//  per_page: number;
  //total: number;
  //current_page: number;
 // prev_page: number | null;
 // next_page: number | null;
 // data: Customer[]
//}

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<ICustomerPaginate> {

    const take = limit;
    const skip = (Number(page) - 1) * take;

    const Customers = await this.customersRepository.findAll({
         page,
         skip,
         take,
      });


      return Customers;
  }
}


export default ListCustomerService
