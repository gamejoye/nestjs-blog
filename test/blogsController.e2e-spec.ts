import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BlogsController } from 'src/modules/blogs/blogs.controller';
import { BlogsService } from 'src/modules/blogs/blogs.service';
import { FoldersRepository } from 'src/repositories/folders/folders.repository-impl';
import { BlogsRepository } from 'src/repositories/blogs/blogs.repository-impl';
import { TagsRepository } from 'src/repositories/tags/tags.repository-impl';

describe('BlogsController (e2e)', () => {
  let app: INestApplication;
  let api: request.SuperTest<request.Test>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [BlogsController],
      providers: [
        BlogsService,
        FoldersRepository,
        BlogsRepository,
        TagsRepository,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    api = request(app.getHttpServer());
  });

  it('/(GET) blogs', () => {
    return api.get('/blogs').expect(200);
  });
});
