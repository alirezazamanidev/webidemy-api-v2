import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { Action} from "../enums";
import { AppAbility, Subjects } from "src/modules/casl/casl-ability.factory";
import { PoliciesGuard } from "../guards";
import { Auth } from "./Auth.decorator";
import { PolicyHandler } from "../types/CheckPolicie.type";

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicie = (action:Action,subject:Subjects) => 
  {
    const handler:PolicyHandler=(ability:AppAbility)=>ability.can(action,subject);
    return applyDecorators (
        Auth(),
        UseGuards(PoliciesGuard),
        SetMetadata(CHECK_POLICIES_KEY,handler),
    )
  }