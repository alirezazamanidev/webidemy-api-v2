import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from './Auth.decorator';
import { RoleGuard } from '../guards/Role.guard';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => {
  return applyDecorators(
      Auth(),
      SetMetadata(ROLES_KEY, roles),
      UseGuards(RoleGuard)
  );
};
