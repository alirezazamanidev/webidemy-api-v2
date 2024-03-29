import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createCategoryDTO, updateCtegoryDTO } from '../dtos/category.dto';

import { CategoryMessages } from '../messages';
import { Model, isValidObjectId } from 'mongoose';

import { QueryPaginateDTO } from 'src/common/dtos';
import { Category } from 'src/common/schemas';
@Injectable()
export class CategoryService {

    constructor(@InjectModel('category') private categoryModel:Model<Category> ){}
    async create(categoryDTO:createCategoryDTO){
        const {title,parent}=categoryDTO;
        const category=await this.categoryModel.findOne({title});
        if(category) throw new BadRequestException(CategoryMessages.ALREADY_EXIST);
        const newCategory=await this.categoryModel.create({parent,title});
        if(!newCategory) throw new InternalServerErrorException(CategoryMessages.NOT_SAVED);
        
    }
   async listOfCategories(QueryPaginateDTO:QueryPaginateDTO){
    const {page,limit}=QueryPaginateDTO;
    let Page= parseInt(page) || 1;
    let Limit = parseInt(limit) || 8;
    let skip = (Page - 1) * Limit;
    const categoreis=await this.categoryModel.find({}).skip(skip)
    .limit(Limit)
    return {
        page:Page,
        limit:Limit,
        data:categoreis
    }
   }
   private async checkExist(cateId:string):Promise<Category>{
    if(cateId && !isValidObjectId(cateId)) throw new BadRequestException(CategoryMessages.RequestNotValid);
    const category=await this.categoryModel.findById(cateId);
    if(!category) throw new NotFoundException(CategoryMessages.NOT_FOUNDED);
    return category;
   }
   async remove(CateId:string){
   await this.checkExist(CateId);
    const result=await this.categoryModel.deleteOne({_id:CateId});
    if(result.deletedCount==0) throw new InternalServerErrorException(CategoryMessages.Server_Error);
   }

   async update(cateId:string,categoryDTO:updateCtegoryDTO){
     await this.checkExist(cateId);
    const result=await this.categoryModel.findByIdAndUpdate(cateId,{$set:{title:categoryDTO.title}});
   }
   async findOne(cateId:string):Promise<Category>{
    const category=await this.checkExist(cateId);
    return category;
   }
  
}
