import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Variant } from './entities/variant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Variant])],
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
