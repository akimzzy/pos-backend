import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemCategory } from '../../item-category/entities/item-category.entity';
import { Variant } from './variant.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Field(() => [ItemCategory], { nullable: true })
  @ManyToMany(() => ItemCategory)
  @JoinTable()
  categories: ItemCategory[];

  @OneToMany(() => Variant, (variant) => variant.item)
  @Field(() => [Variant])
  variants: Variant[];

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }
}
