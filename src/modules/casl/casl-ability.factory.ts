import {  AbilityBuilder, ExtractSubjectType, InferSubjects, MongoAbility, MongoQuery, createMongoAbility } from "@casl/ability";

import { Action, Role } from "src/common/enums";
import { Category } from "../../common/schemas";
import { Injectable } from "@nestjs/common";
import { Course } from "../../common/schemas";
import { User } from "src/common/schemas";


export type Subjects = InferSubjects<typeof Category | typeof User | typeof Course> | 'all';
type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;
@Injectable()
export class CaslAbilityFactory {
    createForUser(user:User){
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility<PossibleAbilities, Conditions>);
       if(user?.role) this.checkCanAccess(user?.role,can,cannot);
       else cannot(Action.Manage,'all');
    return build({
      
        detectSubjectType: (item) =>
          item.constructor as unknown as ExtractSubjectType<Subjects>,
      });
  
    }

    checkCanAccess(role:string,can:any,cannot:any){

        switch (role) {
            case Role.ADMIN:
                can(Action.Manage,'all');
                break;
            case Role.WRITER:
                can([Action.Create,Action.Read,Action.Update],'Blogs');
                break;
            case Role.TEACHER:
                can([Action.Create,Action.Read,Action.Update],Course);
                break;
            default:
                cannot(Action.Manage,'all');
                break;
        }
    }

}
