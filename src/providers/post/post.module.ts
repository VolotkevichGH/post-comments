import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../../database/entities/post.entity";
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UuidModule],
  controllers: [PostController],
  providers: [PostService ],
  exports: [PostService],
})
export class PostModule {}
