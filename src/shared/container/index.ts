import { container } from 'tsyringe';

/* Customer repository */ 

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepositories';

/* Order Repository */

import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';

import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

/* Product Repository */

import IProductRepository from '@modules/products/domain/repositories/IProductRepository';

import { ProductRepository } from '@modules/products/infra/typeorm/reposities/ProductsRepository';

/* User Repository */
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

import UserRepository from '@modules/users/infra/typeorm/reposities/UsersRepository';

/* User Token*/

import UserTokenRepository from '@modules/users/infra/typeorm/reposities/UsersTokensRepository';

import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';

import '@modules/users/providers';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomerRepository)

container.registerSingleton<IProductRepository>('ProductsRepository', ProductRepository)

container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository)

container.registerSingleton<IUsersRepository>('UsersRepository', UserRepository)

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokenRepository)

