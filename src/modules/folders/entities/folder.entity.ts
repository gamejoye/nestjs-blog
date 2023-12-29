import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'create_time' })
  createTime: string;

  @Column()
  deleted: boolean;

  @ManyToMany(() => Blog)
  blogs: Blog[];
}
