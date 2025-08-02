import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

@Entity('posts')
export class Post {
  @ApiProperty({ description: 'The unique identifier of the post' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ description: 'The title of the post' })
  @Column({ length: 200 })
  title!: string;

  @ApiProperty({ description: 'The content of the post' })
  @Column({ type: 'text' })
  content!: string;

  @ApiProperty({ description: 'Whether the post is published' })
  @Column({ default: false })
  isPublished!: boolean;

  @ApiProperty({ description: 'The ID of the author' })
  @Column()
  authorId!: number;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author!: User;

  @ApiProperty({ description: 'The date when the post was created' })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({ description: 'The date when the post was last updated' })
  @UpdateDateColumn()
  updatedAt!: Date;
}
