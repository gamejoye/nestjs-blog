import { IsArray, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Folder } from 'src/modules/folders/entities/folder.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';

export class IAddBlogDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsInt()
  readonly priority: number;

  @IsArray()
  readonly tags: Tag[];

  @IsArray()
  readonly folders: Folder[];
}
