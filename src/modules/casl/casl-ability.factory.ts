import {  AbilityBuilder, ExtractSubjectType, InferSubjects, MongoAbility, MongoQuery, createMongoAbility } from "@casl/ability";
import { User, userDocument } from "../user/user.schema";
import { Action, Role } from "src/common/enums";
import { Category } from "../category/category.schema";
import { Injectable } from "@nestjs/common";


export type Subjects = InferSubjects<typeof Category | typeof User> | 'all';
type PossibleAbilities = [Action, Subjects];
type Conditions = MongoQuery;

export type AppAbility = MongoAbility<PossibleAbilities, Conditions>;
@Injectable()
export class CaslAbilityFactory {
    createForUser(user:userDocument){
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
                can([Action.Create,Action.Read,Action.Update],'Courses');
                break;
            default:
                cannot(Action.Manage,'all');
                break;
        }
    }

}
