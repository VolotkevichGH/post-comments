import { ConfigModule } from '@nestjs/config';
import config from './configurations/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostModule } from './providers/post/post.module';
import { CommentModule } from './providers/comment/comment.module';
import { Comment} from './database/entities/comment.entity';
import { Post } from './database/entities/post.entity';
import { CreateTable1728467307449 } from './database/migrations/1728467307449-CreateTable';

@Module({
  imports: [
    PostModule,
    CommentModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: 5432,
      database: process.env.DB_NAME,
      entities: [Post, Comment],
      logger: 'simple-console',
      logging: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      autoLoadEntities: true,
      migrations: [CreateTable1728467307449],
      migrationsTableName: 'custom_migration_table',
      migrationsRun: false,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
