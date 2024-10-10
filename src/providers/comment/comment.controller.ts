import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}


  @Post('/post/:id')
  async createComment(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: CreateCommentDto) {
    return this.commentService.create(id, dto);
  }

  @Get('/post/:id')
  async getCommentsByPost(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentService.findAllByPostId(id);
  }
}
