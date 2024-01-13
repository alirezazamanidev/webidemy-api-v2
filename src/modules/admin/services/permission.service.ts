import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, isValidObjectId } from 'mongoose';
import { PermissionDocument } from 'src/common/schemas/permission.schema';
import { PermissionMessages } from '../messages/permission.message';
import { createPermissionDTO, updatePermissionDTO } from '../dtos/permission.dto';
import { QueryPaginateDTO } from 'src/common/dtos';

@Injectable()
export class PermissionService {
    constructor(@InjectModel('permission') private permissionModel:Model<PermissionDocument>){}

    private async checkEsist(perId:string){
        if(perId && !isValidObjectId(perId)) throw new BadRequestException(PermissionMessages.RequestNotValid);
        const permission=await this.permissionModel.findById(perId,{_id:0,__v:0});
        if(!permission) throw new NotFoundException(PermissionMessages.NOT_FOUNDED);
        return permission;
    }
    async create(permissionDTO:createPermissionDTO){
        const {name,description,role}=permissionDTO;
    
        const permission=await this.permissionModel.findOne({name});
        if(permission) throw new BadRequestException(PermissionMessages.ALREADY_EXIST);
        const newPermission=await this.permissionModel.create({name,description,role:new Types.ObjectId(role)});
        if(!newPermission) throw new InternalServerErrorException(PermissionMessages.NOT_SAVED);
        return newPermission;
    }
    async listofPermission(QueryPaginateDTO:QueryPaginateDTO){
        const {page,limit}=QueryPaginateDTO;
        let Page= parseInt(page) || 1;
        let Limit = parseInt(limit) || 8;
        let skip = (Page - 1) * Limit;
        const permissions=await this.permissionModel.find({},{__v:0,id:0}).skip(skip)
        .limit(Limit)
        return {
            page:Page,
            limit:Limit,
            data:permissions
        }
    }
    async remove(roleId:string){
        await this.checkEsist(roleId);
        const result= await this.permissionModel.deleteOne({_id:roleId});
       if(result.deletedCount==0) throw new InternalServerErrorException('Not deleted!')

            
    }
    async findOne(perId:string):Promise<PermissionDocument>{
       const permission= await this.checkEsist(perId);
       return permission;
    }
    async update(roleID:string,roleDTO:updatePermissionDTO){
       const {name,description}=roleDTO;
       await this.checkEsist(roleID);
       const result=await this.permissionModel.updateOne({_id:roleID},{$set:{name,description}});
       if(result.modifiedCount==0) throw new InternalServerErrorException('Not updated')
    }
}
