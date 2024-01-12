import { IPlatform } from 'src/common/types/base.type';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlatformProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  platform: IPlatform;

  @Column({ name: 'platform_user_id' })
  platformUserId: number;

  @Column()
  username: string;

  @Column({ name: 'avatar_url' })
  avatarUrl: string;

  @Column({ name: 'access_token' })
  accessToken: string;
}
