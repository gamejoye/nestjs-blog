import { SetMetadata } from '@nestjs/common';
import { RequiredRule } from './abilitits.guard';

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilites = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
