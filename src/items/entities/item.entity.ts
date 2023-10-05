import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemCategory } from '../../item-category/entities/item-category.entity';
import { Variant } from './variant.entity';

@ObjectType()
@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => ItemCategory)
  @JoinTable()
  categories: ItemCategory[];

  @OneToMany(() => Variant, (variant) => variant.item)
  @Field(() => [Variant])
  variants: Variant[];
}
