import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findByName(name: string): Promise<UsersEntity> {
    return await this.usersRepository.findOne({ where: { name } });
  }

  async findAll(query): Promise<API.List<Omit<UsersEntity, 'password'>>> {
    const qb = await this.usersRepository.createQueryBuilder('users');
    qb.select(['users.id', 'users.name', 'users.created_at']);
    qb.where('1 = 1');

    const { page = 1, size = 20 } = query;
    if (page > 0 && size > 0) {
      qb.limit(size + 1);
      qb.offset((page - 1) * size);
    }

    const [list, count] = await qb.getManyAndCount();

    return {
      count,
      list,
    };
  }

  async create(user: Partial<UsersEntity>): Promise<UsersEntity> {
    const { name } = user;
    if (!name) {
      throw new HttpException('缺少用户名', 400);
    }
    const existUser = await this.usersRepository.findOne({ where: { name } });
    if (existUser) {
      throw new HttpException('用户名已存在', 400);
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: number): Promise<UsersEntity> {
    const existUser = await this.usersRepository.findOne({ where: { id } });
    if (!existUser) {
      throw new HttpException(`用户id ${id} 不存在`, 404);
    }
    return await this.usersRepository.remove(existUser);
  }
}
