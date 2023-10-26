import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @ManyToMany(() => ItemCategory, (category) => category.items, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  categories: ItemCategory[];

  @OneToMany(() => Variant, (variant) => variant.item)
  @Field(() => [Variant])
  variants: Variant[];

  @CreateDateColumn()
  @Field(() => Date)
  createdDate: string;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedDate: Date;

  constructor(partial: Partial<Item>) {
    Object.assign(this, partial);
  }
}
