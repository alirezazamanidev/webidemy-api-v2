import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createCategoryDTO } from '../dtos/category.dto';

import { CategoryMessages } from '../messages';
import { PaginateModel, isValidObjectId } from 'mongoose';
import { CategoryDocument } from 'src/modules/category/category.schema';
import { PaginatedDto, QueryPaginateDTO } from 'src/common/dtos';
@Injectable()
export class CategoryService {

    constructor(@InjectModel('category') private categoryModel:PaginateModel<CategoryDocument> ){}
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
   private async checkExist(cateId:string):Promise<CategoryDocument>{
    if(cateId && !isValidObjectId(cateId)) throw new BadRequestException(CategoryMessages.RequestNotValid);
    const category=await this.categoryModel.findById(cateId);
    return category;
   }
   async remove(CateId:string){
    await this.checkExist(CateId);
    const result=await this.categoryModel.deleteOne({_id:CateId});
    if(result.deletedCount==0) throw new InternalServerErrorException(CategoryMessages.Server_Error);
    
   }
  
}
