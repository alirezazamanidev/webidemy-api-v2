import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ContentType } from 'src/common/enums/swagger.enum';
import { createCategoryDTO } from '../dtos/category.dto';
import { CategoryService } from '../services/category.service';
import { CategoryMessages } from '../messages';
import { ApiPaginatedResponse } from 'src/common/decorators';
import { QueryPaginateDTO } from 'src/common/dtos';

@ApiTags('Category(AdminPanel)')
@Controller({
    path:'admin/category'
})
export class CategoryController {
    constructor(private categoryService:CategoryService){}
    @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary:'create a new category',tags:['Category(AdminPanel)']})
    @ApiCreatedResponse({status:HttpStatus.OK,description:'The category has been created!'})
    @ApiBadRequestResponse({status:HttpStatus.BAD_REQUEST,description:"The category already Exist!"})
    @ApiInternalServerErrorResponse({status:HttpStatus.INTERNAL_SERVER_ERROR,description:"The Category Can not saved!!"})
    @Post('/create')
    async create(@Body() categoryDTO:createCategoryDTO){
    await this.categoryService.create(categoryDTO);
    return {
        statusCode:HttpStatus.CREATED,
        message:CategoryMessages.CREATED
    }
    }

  @ApiQuery({name:"page",type:Number,required:false,description:'Enter page with query'})
  @ApiQuery({name:'limit',type:Number,required:false,description:"Enrer limit query"}) 
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async listOfCategories(@Query() QueryPaginateDTO:QueryPaginateDTO){
    
    const data=await this.categoryService.listOfCategories(QueryPaginateDTO);
    return {
      statusCode:HttpStatus.OK,
      data
    }
  }
  
}
