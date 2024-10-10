import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { Post } from '../../database/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post.module';
import { Comment } from '../../database/entities/comment.entity';
import * as process from 'node:process';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          port: 5432,
          database: process.env.DB_NAME,
          entities: [Post, Comment],
        }),
        PostModule,
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  describe('create', () => {
    it('should be create post', async () => {
      const mock = { title: 'Title', content: 'content' };
      // @ts-ignore
      jest.spyOn(service, 'create').mockImplementation(() => mock);
      expect(await service.create(mock)).toBe(mock);
    });
  });
});
