import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../posts/post.entity';

@Entity('users')
export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'The first name of the user' })
  @Column({ length: 100 })
  firstName!: string;

  @ApiProperty({ description: 'The last name of the user' })
  @Column({ length: 100 })
  lastName!: string;

  @ApiProperty({ description: 'The email address of the user' })
  @Column({ unique: true, length: 255 })
  email!: string;

  @ApiProperty({ description: 'The age of the user' })
  @Column({ type: 'int', nullable: true })
  age!: number;

  @ApiProperty({ description: 'Whether the user is active' })
  @Column({ default: true })
  isActive!: boolean;

  @ApiProperty({ description: 'The date when the user was created' })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({ description: 'The date when the user was last updated' })
  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];
}
