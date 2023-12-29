import { Account } from 'src/modules/accounts/entities/account.entity';
import { Blog } from 'src/modules/blogs/entities/blog.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Blog)
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column('text')
  content: string;

  @OneToOne(() => BlogComment)
  @JoinColumn({ name: 'parent_comment_id' })
  parentComment?: BlogComment;

  @Column({ name: 'create_time' })
  createTime: string;

  @Column({ name: 'edit_time' })
  editTime?: string;

  @Column()
  deleted: boolean;
}
