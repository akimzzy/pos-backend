import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';
import { ItemCategory } from './entities/item-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, ILike, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemCategoryService {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(ItemCategory)
    private readonly itemCategoryRepository: Repository<ItemCategory>,
  ) {}

  async create(
    user: User,
    { name }: CreateItemCategoryInput,
    manager: EntityManager = this.manager,
  ) {
    try {
      const category = new ItemCategory({ name, user });
      return manager.save(category);
    } catch (error) {
      throw new BadRequestException('Failed to create category');
    }
  }

  async findOrCreateCategory(
    user: User,
    createCategoryInput: CreateItemCategoryInput,
    manager: EntityManager = this.manager,
  ): Promise<ItemCategory> {
    let category = await manager.findOne(ItemCategory, {
      where: {
        name: ILike(createCategoryInput.name),
        user: { id: user.id },
      },
    });
    if (!category) {
      category = await this.create(
        user,
        createCategoryInput,
        manager || this.manager,
      );
    }
    return category;
  }

  findAll() {
    return `This action returns all itemCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemCategory`;
  }

  update(id: number, updateItemCategoryInput: UpdateItemCategoryInput) {
    updateItemCategoryInput;
    return `This action updates a #${id} itemCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemCategory`;
  }
}
