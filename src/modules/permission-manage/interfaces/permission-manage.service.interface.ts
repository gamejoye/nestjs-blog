import { Permission } from '../entitits/permission.entity';
import { Role } from '../entitits/role.entity';

export interface IPermissionManageService {
  loadAll(): Promise<boolean>;
  init(): Promise<boolean>;
  getPermissionsByRoleId(roleId: number): Promise<Permission[]>;
  getPermissionsByAccountId(accountId: number): Promise<Permission[]>;
  getRolesByAccountId(accountId: number): Promise<Role[]>;
}
