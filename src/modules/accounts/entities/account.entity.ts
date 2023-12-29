import { PlatformProfile } from 'src/modules/platform-profiles/entities/platform-profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PlatformProfile, { cascade: ['insert'] })
  @JoinColumn({ name: 'platform_profile_id' })
  platformProfile: PlatformProfile;

  @Column({ name: 'web_url' })
  webUrl: string;

  @Column()
  description: string;

  @Column({ name: 'create_time' })
  createTime: string;

  @Column({ name: 'edit_time' })
  editTime?: string;
}
