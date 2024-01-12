import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
} from 'src/common/constants/providers';
import { Repository } from 'typeorm';
import { Role } from './entitits/role.entity';
import { Permission } from './entitits/permission.entity';
import { IPermissionManageService } from './interfaces/permission-manage.service.interface';

@Injectable()
export class PermissionManageService
  implements IPermissionManageService, OnModuleInit
{
  private account2RoleMap: Map<number, Role[]> = new Map();
  private role2permissionMap: Map<number, Permission[]> = new Map();
  private loadingPromise: Promise<void> | null = null;
  constructor(
    @Inject(ROLE_REPOSITORY) private roleRepository: Repository<Role>,
    @Inject(PERMISSION_REPOSITORY)
    private permissionRepository: Repository<Permission>,
  ) {}
  onModuleInit() {
    this.loadAll();
  }
  async getPermissionsByAccountId(accountId: number): Promise<Permission[]> {
    console.log(this.account2RoleMap, this.role2permissionMap);
    const roles = await this.getRolesByAccountId(accountId);
    const permissions = (
      await Promise.all(
        roles.map((role) => this.getPermissionsByRoleId(role.id)),
      )
    ).flat();
    return Array.from(new Set(permissions));
  }
  async init(): Promise<boolean> {
    return await this.loadAll();
  }
  async loadAll(): Promise<boolean> {
    this.loadingPromise = new Promise(async (resolve, reject) => {
      try {
        const [roles, permissions] = await Promise.all([
          this.roleRepository.find({
            relations: ['accounts'],
          }),
          this.permissionRepository.find({
            relations: ['roles'],
          }),
        ]);
        this.account2RoleMap.clear();
        this.role2permissionMap.clear();
        this.initMap(roles, permissions);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    return true;
  }
  async getPermissionsByRoleId(roleId: number): Promise<Permission[]> {
    await this.ensureLoaded();
    const permissions = this.role2permissionMap.get(roleId) || [];
    return Promise.resolve(permissions);
  }
  async getRolesByAccountId(accountId: number): Promise<Role[]> {
    await this.ensureLoaded();
    const roles = this.account2RoleMap.get(accountId) || [];
    return Promise.resolve(roles);
  }

  private async ensureLoaded() {
    if (!this.loadingPromise) {
      await this.loadAll();
    } else {
      await this.loadingPromise;
    }
  }

  private initMap(roles: Role[], permissions: Permission[]) {
    roles.forEach((role) => {
      const accounts = role.accounts;
      accounts.forEach((account) => {
        if (this.account2RoleMap.has(account.id)) {
          this.account2RoleMap.get(account.id).push(role);
        } else {
          this.account2RoleMap.set(account.id, [role]);
        }
      });
    });

    permissions.forEach((permission) => {
      const roles = permission.roles;
      roles.forEach((role) => {
        if (this.role2permissionMap.has(role.id)) {
          this.role2permissionMap.get(role.id).push(permission);
        } else {
          this.role2permissionMap.set(role.id, [permission]);
        }
      });
    });
  }
}
