import { create } from "domain";
import FakeCustomerRepository from "../domain/repositories/fakes/FakeCustomerRepository";
import CreateCustomerService from "./CreateCustomerService";
import AppError from "@shared/errors/AppError";

let fakeCustomerRepository: FakeCustomerRepository
let createCustomer: CreateCustomerService;

// describe cria um agrupamento de teste
describe('CreateCustomer', () => {
    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomerRepository();
        createCustomer = new CreateCustomerService(fakeCustomerRepository);
    });
    
    it('should be able to create a new customer', async () => {


        const customer = await createCustomer.execute({
            name: 'Jorge Aluizio',
            email: 'teste@teste.com',
        })

        expect(customer).toHaveProperty('id');
    });

    it('should not be able to create two client with the same email', async () => {


         await createCustomer.execute({
            name: 'Jorge Aluizio',
            email: 'teste@teste.com',
        })

        expect(createCustomer.execute({
            name: 'Jorge Aluizio',
            email: 'teste@teste.com',
        })).rejects.toBeInstanceOf(AppError);

    })
});

