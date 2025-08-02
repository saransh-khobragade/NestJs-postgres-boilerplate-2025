import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
    type: PostEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of all posts',
    type: [PostEntity],
  })
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get('published')
  @ApiOperation({ summary: 'Get all published posts' })
  @ApiResponse({
    status: 200,
    description: 'List of published posts',
    type: [PostEntity],
  })
  findPublished(): Promise<PostEntity[]> {
    return this.postsService.findPublished();
  }

  @Get('author/:authorId')
  @ApiOperation({ summary: 'Get posts by author ID' })
  @ApiParam({ name: 'authorId', description: 'Author ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'List of posts by author',
    type: [PostEntity],
  })
  findByAuthor(
    @Param('authorId', ParseIntPipe) authorId: number,
  ): Promise<PostEntity[]> {
    return this.postsService.findByAuthor(authorId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Post found', type: PostEntity })
  @ApiResponse({ status: 404, description: 'Post not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiParam({ name: 'id', description: 'Post ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
    type: PostEntity,
  })
  @ApiResponse({ status: 404, description: 'Post not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiParam({ name: 'id', description: 'Post ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.postsService.remove(id);
  }
}
