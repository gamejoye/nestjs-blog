import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Action, Subject } from 'src/modules/casl/abilitits.guard';
import { ROLE_PERMISSION } from 'src/modules/database/tables';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Action,
  })
  action: Action;

  @Column({ type: 'varchar' })
  subject: Subject;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({
    name: ROLE_PERMISSION,
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
