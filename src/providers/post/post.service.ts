import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>) {}

  async getAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const post = this.postRepository.create(dto);
    return this.postRepository.save(post);
  }

  async getById(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException();
    return post;
  }

  async delete(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException();
    return true;
  }

  async update(id: string, dto: CreatePostDto) {
    await this.postRepository.update(id, dto);
    return this.postRepository.findOne({ where: { id } });
  }

  async findById(id:string): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }
}
