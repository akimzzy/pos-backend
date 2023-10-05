import { Module } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { ItemCategoryResolver } from './item-category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategory } from './entities/item-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemCategory])],
  providers: [ItemCategoryResolver, ItemCategoryService],
})
export class ItemCategoryModule {}
