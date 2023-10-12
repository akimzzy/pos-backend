import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, ILike, In, Repository } from 'typeorm';
import { CreateVariantInput } from './dto/create-variant.input';
import { Variant } from './entities/variant.entity';
import { ItemsService } from './items.service';
import { DeleteResponse } from '../utils/responses/delete-enitity.response';

@Injectable()
export class VariantService {
  constructor(
    private readonly manager: EntityManager,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @Inject(forwardRef(() => ItemsService))
    private readonly itemService: ItemsService,
  ) {}

  async create(
    itemId: string,
    createVariantsInput: CreateVariantInput[],
    manager: EntityManager = this.manager,
  ) {
    const item = await this.itemService.findOne(itemId, manager);
    if (!item) {
      throw new BadRequestException('Item cannot be empty for a variant');
    }
    await this.checkIfVariantNameIsUsed(createVariantsInput, itemId);

    try {
      const variants: Variant[] = [];
      createVariantsInput.forEach((variant) =>
        variants.push(new Variant({ ...variant, item })),
      );
      return manager.save(variants);
    } catch (error) {
      throw new BadRequestException('Failed to create variants');
    }
  }

  private async checkIfVariantNameIsUsed(
    createVariantsInput: CreateVariantInput[],
    itemId: string,
  ) {
    for (const vi of createVariantsInput) {
      const check = await this.variantRepository.findOne({
        where: { name: ILike(vi.name), item: { id: itemId } },
      });
      if (check) {
        throw new BadRequestException(
          `A variant with the name ${vi.name} already part of the item`,
        );
      }
    }
  }

  async findOne(
    id: string,
    userId?: string,
    manager: EntityManager = this.manager,
  ) {
    const variant = await manager.findOne(Variant, {
      where: { id, item: { user: { id: userId } } },
      relations: { item: { user: true } },
    });

    if (!variant) {
      throw new BadRequestException('Variant not found');
    }

    return variant;
  }

  async update(
    id: string,
    userId: string,
    updateItemInput: CreateVariantInput,
  ) {
    const variant = await this.findOne(id, userId);
    Object.assign(variant, updateItemInput);
    return this.variantRepository.save(variant);
  }

  async remove(
    userId: string,
    removeVariantsInput: string[],
  ): Promise<DeleteResponse> {
    const variants = await this.variantRepository.find({
      where: {
        id: In(removeVariantsInput),
        item: { user: { id: userId } },
      },
    });
    await this.variantRepository.remove(variants);
    return { message: 'Variants has been deleted' };
  }
}
