import { AppAbility, CaslAbilityFactory } from "src/modules/casl/casl-ability.factory";
import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CHECK_POLICIES_KEY } from "../decorators/CheckPolicie.decorator";
import { PolicyHandler } from "../types/CheckPolicie.type";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandler =
      this.reflector.get<PolicyHandler>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      );

      
      


    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);

     return this.execPolicyHandler(policyHandler, ability)
    
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}