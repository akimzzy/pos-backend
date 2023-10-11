import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';
import { ItemCategory } from './entities/item-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, ILike, In, Not, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Item } from '../items/entities/item.entity';
import { DeleteResponse } from '../utils/responses/delete-enitity.response';

@Injectable()
export class ItemCategoryService {
  constructor(
    private readonly dataSource: DataSource,
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

  async addItemsToCategory(user: User, itemIds: string[], categoryId: string) {
    try {
      const category = await this.findOne(categoryId, user.id);
      const items = await this.manager.findBy(Item, { id: In(itemIds) });
      // TODO: remove items from default category
      category.items.push(...items);
      return this.itemCategoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException('Failed to add items to category');
    }
  }

  async findAll(user: User) {
    return this.itemCategoryRepository.find({
      where: { user: { id: user.id }, name: Not('default') },
      relations: { items: true },
    });
  }

  async findOne(id: string, userId?: string) {
    const category = await this.itemCategoryRepository.findOne({
      where: { id, user: { id: userId } },
      relations: { items: true },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    user: User,
    id: string,
    updateItemCategoryInput: UpdateItemCategoryInput,
  ) {
    const category = await this.findOne(id, user.id);
    try {
      Object.assign(category, updateItemCategoryInput);
      return this.itemCategoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException(
        'Error updating item category, please try again or contact support.',
      );
    }
  }

  async remove(user: User, id: string): Promise<DeleteResponse> {
    const category = await this.findOne(id, user.id);
    try {
      await this.itemCategoryRepository.remove(category);
      return { message: 'Category deleted!' };
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while deleting item category, please try again or contact support.',
      );
    }
  }
}
