import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Information {
  @PrimaryColumn()
  name: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'avatar_url' })
  avatarUrl: string;

  @Column({ name: 'sex' })
  sex: 'w' | 'm';

  @Column()
  address: string;

  @Column()
  birthday: string;

  @Column({ name: 'about_me' })
  aboutMe: string;
}
