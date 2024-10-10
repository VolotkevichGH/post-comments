import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1728467307449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE posts (\n' +
        '  id varchar(55),\n' +
        '  title varchar(55),\n' +
        '  content text,\n' +
        '  created_at Date,\n' +
        '  updated_at Date,\n' +
        '  CONSTRAINT PK_POSTID PRIMARY KEY (id) \n' +
        ');',
    );

    await queryRunner.query(
      'CREATE TABLE comments (\n' +
        '  id varchar(55),\n' +
        '  content text, \n' +
        '  post_id varchar(55),\n' +
        '  created_at Date,\n' +
        '  updated_at Date,\n' +
        '  CONSTRAINT pk_COMMENT_ID PRIMARY KEY (id),\n' +
        '  CONSTRAINT fk_POSTID FOREIGN KEY (post_id)\n' +
        '      REFERENCES posts (id)' +
        ');',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
