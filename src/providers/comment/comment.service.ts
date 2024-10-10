import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../database/entities/comment.entity';
import { PostService } from '../post/post.service';
import { CreateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor (
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  async create(id: string, dto: CreateCommentDto): Promise<Comment> {
    const post = await this.postService.getById(id);
    if (!post) throw new NotFoundException(`Post with id \`${id}\` not found`);
    return this.commentRepository.save({
      post: post,
      content: dto.content,
    });
  }

  async findAllByPostId(id: string) {
    const post = await this.postService.getById(id);
    if (!post) throw new NotFoundException(`Post with id \`${id}\` not found`);
    return await this.commentRepository.query(`SELECT * FROM comments WHERE post_id = '${id}'`);
  }
}
