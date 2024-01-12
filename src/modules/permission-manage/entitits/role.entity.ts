import { Account } from 'src/modules/accounts/entities/account.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';
import { ACCOUNT_ROLE } from 'src/modules/database/tables';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'role_name' })
  roleName: string;

  @ManyToMany(() => Account, (account) => account.roles)
  @JoinTable({
    name: ACCOUNT_ROLE,
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'account_id',
      referencedColumnName: 'id',
    },
  })
  accounts: Account[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
