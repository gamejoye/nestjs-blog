import { BlogComment } from 'src/modules/blogs-comments/entities/blog-comment.entity';
import { BLOG_FOLDER, BLOG_TAG } from 'src/modules/database/tables';
import { Folder } from 'src/modules/folders/entities/folder.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToMany(() => Tag, { cascade: ['insert'] })
  @JoinTable({
    name: BLOG_TAG,
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];

  @Column()
  priority: number;

  @Column()
  views: number;

  @ManyToMany(() => Folder, { cascade: ['insert'] })
  @JoinTable({
    name: BLOG_FOLDER,
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'folder_id',
      referencedColumnName: 'id',
    },
  })
  folders: Folder[];

  @Column({ name: 'create_time' })
  createTime: string;

  @Column()
  deleted: boolean;

  @OneToMany(() => BlogComment, (comment) => comment.blog)
  comments: BlogComment[];

  commentsCount: number = 0;
}
