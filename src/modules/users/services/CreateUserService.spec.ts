import 'reflect-metadata';
import { create } from "domain";
import CreateUserService from "./CreateUserService";
import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../provider/HashProvider/fakes/FakeHashProvider";


let fakeUserRepository: FakeUsersRepository
let createUser: CreateUserService;
let hashProvider: FakeHashProvider

// describe cria um agrupamento de teste
describe('CreateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUserRepository, hashProvider);
    });
    
    it('should be able to create a new User', async () => {


        const User = await createUser.execute({
            name: 'Jorge Aluizio',
            email: 'teste@teste.com',
            password: '123456',
        })

        expect(User).toHaveProperty('id');
    });

    it('should not be able to create two users with the same email', async () => {


        await createUser.execute({
            name: 'Jorge Aluizio',
            email: 'teste@teste.com',
            password: '123456',
        })

        expect(await createUser.execute({
            name: 'Jorge Aluizio',
            email: 'teste@teste.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError);

  
    })
});