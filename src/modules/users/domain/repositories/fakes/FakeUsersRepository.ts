import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import User from '@modules/users/infra/typeorm/entities/User';
import { IPaginateUser } from '../../models/IPaginateUser';
import { IUsersRepository } from '../IUsersRepository';
import { SearchParams } from '@modules/customers/domain/repositories/ICustomersRepository';

class FakeUsersRepository implements IUsersRepository{
  private users: User[] = [];

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async remove(user: User): Promise<void> {}
  public findAll({ page, skip, take }: SearchParams): Promise<IPaginateUser> {
    return {
      per_page: page,
      total: 4,
      current_page: 2,
      data: this.users,
    } 
  }

  public async findAllPaginate(): Promise<IPaginateUser> {
    const usersPaginate = {
      from: 1,
      to: 1,
      per_page: 1,
      total: 1,
      current_page: 1,
      prev_page: null,
      next_page: null,
      data: this.users,
    };

    return usersPaginate;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
}

export default FakeUsersRepository;