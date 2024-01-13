import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument } from 'src/common/schemas/Role.schema';
import { createRoleDTO } from '../dtos/role.dto';
import { RoleMessages } from '../messages/role.message';

@Injectable()
export class RoleService {

    constructor(@InjectModel('role') private roleModel:Model<RoleDocument>){}

    async create(roleDTO:createRoleDTO){
        const {title,description}=roleDTO;
        const role=await this.roleModel.findOne({title});
        if(role) throw new BadRequestException(RoleMessages.ALREADY_EXIST);
        const newRole=await this.roleModel.create({title,description});
        if(!newRole) throw new InternalServerErrorException();
        return newRole;
    }
}
