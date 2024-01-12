import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { PermissionManageService } from 'src/modules/permission-manage/permission-manage.service';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY } from 'src/modules/casl/abilities.decorator';
import { Account } from 'src/modules/accounts/entities/account.entity';
import { Permission } from '../permission-manage/entitits/permission.entity';
import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  ForcedSubject,
  PureAbility,
} from '@casl/ability';

@Injectable()
export class AbilititsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionManageService: PermissionManageService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, ctx.getHandler()) || [];
    if (rules.length === 0) {
      // no constraints
      return true;
    }

    const req: Request = ctx.switchToHttp().getRequest();
    const account = req.user as Account;
    if (!account) {
      throw new HttpException('游客权限不足', HttpStatus.FORBIDDEN);
    }

    const permissions =
      await this.permissionManageService.getPermissionsByAccountId(account.id);
    // console.log('permissions: ', permissions);
    // console.log('rules', rules);
    const ability = this.createAbility(permissions);

    return rules.every((rule) => ability.can(rule.action, rule.subject));
  }

  createAbility(permissions: Permission[]) {
    const { can, build } = new AbilityBuilder<PureAbility<Abilities>>(
      PureAbility as AbilityClass<PureAbility<Abilities>>,
    );

    permissions.forEach(({ action, subject }) => {
      can(action, subject);
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<typeof subjects>,
    });
  }
}

const actions = ['read', 'manage', 'create', 'update', 'delete'] as const;
export enum Action {
  Read = 'read',
  Manage = 'manage',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

const subjects = [
  'Blog',
  'Tag',
  'Folder',
  'BlogComment',
  'Account',
  'all',
] as const;
export enum Subject {
  Blog = 'Blog',
  Tag = 'Tag',
  Folder = 'Folder',
  BlogComment = 'BlogComment',
  Account = 'Account',
  All = 'all',
}

export type Abilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
];

export interface RequiredRule {
  action: (typeof actions)[number];
  subject: (typeof subjects)[number];
}
