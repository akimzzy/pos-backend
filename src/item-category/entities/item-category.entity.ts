import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from '../../items/entities/item.entity';

@Entity()
@ObjectType()
export class ItemCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => User, (user) => user.categories)
  @Field(() => User)
  user: User;

  @Field(() => [Item], { nullable: true })
  @ManyToMany(() => Item, (item) => item.categories, { onDelete: 'CASCADE' })
  items: Item[];

  constructor(partial: Partial<ItemCategory>) {
    Object.assign(this, partial);
  }
}
