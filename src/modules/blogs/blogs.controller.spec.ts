import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { IBlog, IFolder, ITag } from 'src/common/types/base.type';
import { initializeDatabase } from 'src/common/utils/test-helper';
import { IAddBlogDto } from './dto/add-blog.dto';
import { initialBlogs } from 'src/common/test-datas/blog-data';
import { tag1 } from 'src/common/test-datas/tag-data';
import { folder1 } from 'src/common/test-datas/folder-data';
import { getCurrentDatetime } from 'src/common/utils/dayjs-helper';
import { blogsProviders } from './blogs.providers';

describe('BlogsController', () => {
  let controller: BlogsController;
  let api: request.SuperTest<request.Test>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [BlogsController],
      providers: [...blogsProviders, BlogsService],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
    await initializeDatabase(module);

    const app = module.createNestApplication();
    await app.init();
    api = request(app.getHttpServer());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('blog should to successful addition', async () => {
    const dto: IAddBlogDto = {
      title: 'hello',
      content: 'hello world! i am a acmer',
      priority: 0,
      views: 0,
      tags: [],
      folders: [],
    };
    const response = await api
      .post('/blogs')
      .send(dto)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blog: IBlog = response.body;
    const blogs: IBlog[] = (await api.get('/blogs')).body;
    expect(blogs).toEqual([...initialBlogs, blog]);
    expect(blog.id).not.toBeNull();
  });

  test('tag and folder should be added when add a blog', async () => {
    const newTag: ITag = {
      id: null as any,
      name: 'test_tag',
      createTime: getCurrentDatetime(),
      deleted: true,
    };
    const newFolder: IFolder = {
      id: null as any,
      name: 'test_folder',
      createTime: null as any,
      deleted: false,
    };
    const dto: IAddBlogDto = {
      title: 'hello',
      content: 'hello world! i am a acmer',
      priority: 0,
      views: 0,
      tags: [tag1, newTag],
      folders: [folder1, newFolder],
    };
    const blog: IBlog = (await api.post('/blogs').send(dto).expect(201)).body;

    const expectdTags: ITag[] = [
      tag1,
      { ...newTag, id: blog.tags[blog.tags.length - 1].id },
    ];
    const expectdFolders: IFolder[] = [
      folder1,
      {
        ...newFolder,
        id: blog.folders[blog.folders.length - 1].id,
        createTime: blog.folders[blog.folders.length - 1].createTime,
      },
    ];
    expect(blog.tags[blog.tags.length - 1].id).not.toBeNull();
    expect(blog.tags).toEqual(expectdTags);

    expect(blog.folders[blog.folders.length - 1].id).not.toBeNull();
    expect(blog.folders[blog.folders.length - 1].createTime).not.toBeNull();
    expect(blog.folders).toEqual(expectdFolders);
    console.log('tags: ', blog.tags, expectdTags);
    console.log('folders: ', blog.folders, expectdFolders);
  });
});
