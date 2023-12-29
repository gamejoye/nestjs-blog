import * as tables from 'src/modules/database/tables';
import { initialInformation } from '../test-datas/information-data';
import { initialTags } from '../test-datas/tag-data';
import { initialFolders } from '../test-datas/folder-data';
import { initialBlogs } from '../test-datas/blog-data';
import { initialBlogComments } from '../test-datas/blog-comment-data';
import { initialBlogsFolers } from '../test-datas/blog-folder-data';
import { initialBlogsTags } from '../test-datas/blog-tag-data';
import { TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { Folder } from 'src/modules/folders/entities/folder.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Information } from 'src/modules/information/entities/information.entity';
import {
  BLOG_COMMENT_REPOSITORY,
  BLOG_REPOSITORY,
  FOLDER_REPOSITORY,
  INFORMATION_REPOSITORY,
  TAG_REPOSITORY,
} from '../constants/providers';
import { blogsProviders } from 'src/modules/blogs/blogs.providers';
import { blogsCommentsProviders } from 'src/modules/blogs-comments/blogs-comments.providers';
import { foldersProviders } from 'src/modules/folders/folders.providers';
import { tagsProviders } from 'src/modules/tags/tags.providers';
import { informationProviders } from 'src/modules/information/information.providers';
import { BlogComment } from 'src/modules/blogs-comments/entities/blog-comment.entity';

/**
 * 数据库全局初始化
 */
export async function initializeDatabase(module: TestingModule) {
  const blogRepository = module.get<Repository<Blog>>(BLOG_REPOSITORY);
  await blogRepository.clear();

  const folderRepository = module.get<Repository<Folder>>(FOLDER_REPOSITORY);
  await folderRepository.clear();

  const tagRepository = module.get<Repository<Tag>>(TAG_REPOSITORY);
  await tagRepository.clear();

  const informationRepository = module.get<Repository<Information>>(
    INFORMATION_REPOSITORY,
  );
  await informationRepository.clear();

  const blogCommentRepository = module.get<Repository<BlogComment>>(
    BLOG_COMMENT_REPOSITORY,
  );
  await blogCommentRepository.clear();

  await blogRepository.save(initialBlogs);
  //await folderRepository.save(initialFolders);
  //await tagRepository.save(initialTags);
  await informationRepository.save(initialInformation);
  await blogCommentRepository.save(initialBlogComments);

  // await initializeBlogTable(blogsRepository);

  // const foldersRepository = module.get<FoldersRepository>(getRepositoryToken(Blog));
  // await initializeFolderTable(foldersRepository);

  // const tagsRepository = module.get<TagsRepository>(TagsRepository);
  // await initializeTagTable(tagsRepository);

  // const blogsFoldersRepository = module.get<BlogsFoldersRepository>(
  //   BlogsFoldersRepository,
  // );
  // await initializeBlogFolderTable(blogsFoldersRepository);

  // const blogsTagsRepository =
  //   module.get<BlogsTagsRepository>(BlogsTagsRepository);
  // await initializeBlogTagTable(blogsTagsRepository);

  // const informationRepository = module.get<InformationRepository>(
  //   InformationRepository,
  // );
  // await initializeInformationTable(informationRepository);
}

// export async function initializeInformationTable(
//   informationRepository: InformationRepository,
// ) {
//   await informationRepository.addInformation(initialInformation);
// }

// export async function initializeTagTable(tagsRepository: TagsRepository) {
//   for (const tag of initialTags) {
//     await tagsRepository.addTag(tag);
//   }
// }

// export async function initializeFolderTable(
//   foldersRepository: FoldersRepository,
// ) {
//   for (const folder of initialFolders) {
//     await foldersRepository.addFolder(folder);
//   }
// }

// export async function initializeBlogTable(blogsRepository: BlogsRepository) {
//   for (const blog of initialBlogs) {
//     await blogsRepository.addBlog(blog);
//   }
// }

// export async function initializeBlogCommentTable(
//   blogsCommentsRepository: BlogsCommentsRepository,
// ) {
//   for (const comment of initialBlogComments) {
//     await blogsCommentsRepository.addBlogComment(comment);
//   }
// }

// export async function initializeBlogFolderTable(
//   blogsFoldersRepository: BlogsFoldersRepository,
// ) {
//   for (const [blog, folder] of initialBlogsFolers) {
//     await blogsFoldersRepository.addBlogToFolder(blog.id, folder.id);
//   }
// }

// export async function initializeBlogTagTable(
//   blogsTagsRepository: BlogsTagsRepository,
// ) {
//   for (const [blog, tag] of initialBlogsTags) {
//     await blogsTagsRepository.addBlogTag(blog.id, tag.id);
//   }
// }

export const allProvidersForTypeorm = [
  ...blogsProviders,
  ...blogsCommentsProviders,
  ...foldersProviders,
  ...tagsProviders,
  ...informationProviders,
];
