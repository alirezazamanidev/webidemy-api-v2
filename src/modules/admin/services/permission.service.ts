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

    private async checkEsist(roleId:string){
        if(roleId && !isValidObjectId(roleId)) throw new BadRequestException(PermissionMessages.RequestNotValid);
        const role=await this.permissionModel.findById(roleId,{_id:0,__v:0});
        if(!role) throw new NotFoundException(PermissionMessages.NOT_FOUNDED);
        return role;
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
        const roles=await this.permissionModel.find({},{__v:0,id:0}).skip(skip)
        .limit(Limit)
        return {
            page:Page,
            limit:Limit,
            data:roles
        }
    }
    async remove(roleId:string){
        await this.checkEsist(roleId);
        const result= await this.permissionModel.deleteOne({_id:roleId});
       if(result.deletedCount==0) throw new InternalServerErrorException('Not updated')

            
    }
    async findOne(roleId:string):Promise<PermissionDocument>{
       const role= await this.checkEsist(roleId);
       return role;
    }
    async update(roleID:string,roleDTO:updatePermissionDTO){
       const {title,description}=roleDTO;
       await this.checkEsist(roleID);
       const result=await this.permissionModel.updateOne({_id:roleID},{$set:{title,description}});
       if(result.modifiedCount==0) throw new InternalServerErrorException('Not updated')
    }
}
