import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, ILike, Repository } from 'typeorm';
import { VariantService } from './variant.service';
import { ItemCategoryService } from '../item-category/item-category.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    private readonly manager: EntityManager,
    private readonly dataSource: DataSource,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly variantService: VariantService,
    private readonly userService: UsersService,
    private readonly categoryService: ItemCategoryService,
  ) {}
  async create({
    category: categoryName,
    description,
    name,
    userId,
    variants: variantsInput,
  }: CreateItemInput) {
    await this.isItemNameTaken(userId, name);
    return this.dataSource.transaction(async (manager) => {
      const user = await this.userService.findOne(userId, manager);
      const category = await this.categoryService.findOrCreateCategory(
        user,
        { name: categoryName },
        manager,
      );
      const item = new Item({ name, description, user });
      await manager.save(item);
      const variants = await this.variantService.create(
        item.id,
        variantsInput,
        manager,
      );
      item.categories = [category];
      await manager.save(item);
      item.variants = variants;
      return item;
    });
  }

  async findAll(user: User) {
    const item = await this.itemRepository.find({
      where: { user: { id: user.id } },
      relations: { user: true, variants: true, categories: true },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async findOne(id: string, manager: EntityManager = this.manager) {
    const item = await manager.findOne(Item, {
      where: { id },
      relations: { user: true, variants: true, categories: true },
    });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async findOneByNameAndUser(
    userId: string,
    name: string,
    skipError = false,
    manager = this.manager,
  ) {
    const item = await manager.findOne(Item, {
      where: { name: ILike(name), user: { id: userId } },
    });
    if (!item && !skipError) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput, user: User) {
    if (!id) {
      throw new BadRequestException(`Item ID required to update`);
    }
    if (!updateItemInput.name && !updateItemInput.description) {
      throw new BadRequestException(
        ` Name or description not provided for update`,
      );
    }
    if (updateItemInput.name) {
      await this.isItemNameTaken(user.id, updateItemInput.name);
    }
    try {
      const item = await this.findOne(id);
      Object.assign(item, updateItemInput);
      return this.itemRepository.save(item);
    } catch (error) {
      throw new BadRequestException(`Failed to update item, please try again.`);
    }
  }

  private async isItemNameTaken(userId: string, name: string) {
    const itemExist = await this.findOneByNameAndUser(userId, name, true);
    if (itemExist) {
      throw new BadRequestException(`Item with ${name} already exists`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
