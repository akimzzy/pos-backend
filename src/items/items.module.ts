import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Variant } from './entities/variant.entity';
import { VariantService } from './variant.service';
import { UsersModule } from '../users/users.module';
import { ItemCategoryModule } from '../item-category/item-category.module';
import { VariantResolver } from './variant.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Variant]),
    UsersModule,
    ItemCategoryModule,
  ],
  providers: [ItemsResolver, ItemsService, VariantService, VariantResolver],
  exports: [VariantService],
})
export class ItemsModule {}
