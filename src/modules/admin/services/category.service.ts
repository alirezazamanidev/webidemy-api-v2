import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createCategoryDTO } from '../dtos/category.dto';
import { Model } from 'mongoose';
import { categoryDocumemnt } from 'src/modules/category/category.schema';
import { CategoryMessages } from '../messages';
@Injectable()
export class CategoryService {

    constructor(@InjectModel('category')private categoryModel:Model<categoryDocumemnt> ){}
    async create(categoryDTO:createCategoryDTO){
        const {title,parent}=categoryDTO;
        const category=await this.categoryModel.findOne({title});
        if(category) throw new BadRequestException(CategoryMessages.ALREADY_EXIST);
        const newCategory=await this.categoryModel.create({parent,title});
        if(!newCategory) throw new InternalServerErrorException(CategoryMessages.NOT_SAVED);
        
    }
}
