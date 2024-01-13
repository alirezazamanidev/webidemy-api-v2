import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
          ]);
    
          
          const {user}=context.switchToHttp().getRequest();
          
          
        return requiredRoles.includes(user.role);
    }
}