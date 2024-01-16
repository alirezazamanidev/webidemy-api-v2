import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ContentType } from 'src/common/enums/swagger.enum';
import { createCategoryDTO, updateCtegoryDTO } from '../dtos/category.dto';
import { CategoryService } from '../services/category.service';
import { CategoryMessages } from '../messages';
import { ApiPaginatedResponse, CheckPolicie } from 'src/common/decorators';
import { QueryPaginateDTO } from 'src/common/dtos';
import { Category } from 'src/common/schemas';
import { Action } from 'src/common/enums';
@ApiSecurity('access_token')
@ApiTags('Category(AdminPanel)')
@Controller({
  path: 'admin/category',
})
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @CheckPolicie(Action.Create,Category)
  @ApiConsumes(ContentType.URL_ENCODED, ContentType.JSON)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'create a new category',
    tags: ['Category(AdminPanel)'],
  })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'The category has been created!',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The category already Exist!',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'The Category Can not saved!!',
  })
  @Post('/create')
  async create(@Body() categoryDTO: createCategoryDTO) {
    await this.categoryService.create(categoryDTO);
    return {
      statusCode: HttpStatus.CREATED,
      message: CategoryMessages.CREATED,
    };
  }
  @CheckPolicie(Action.Read,Category)
  @ApiPaginatedResponse(Category)
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Enrer limit query',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Enter page with query',
  })
  @ApiOperation({summary:'Get List of categories'})
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async listOfCategories(@Query() QueryPaginateDTO: QueryPaginateDTO){
    const data = await this.categoryService.listOfCategories(QueryPaginateDTO);
    return {
      statusCode:HttpStatus.OK,
      data
    }
  }
  @ApiParam({
    name:'cateId',
    type:String,
    required:true
  })
  @CheckPolicie(Action.Delete,Category)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary:'delete one category with Id'})
  @ApiOkResponse({status:HttpStatus.OK,description:"Success"})
  @Delete('remove/:cateId')
  async remove(@Param('cateId') cateId:string){
    await this.categoryService.remove(cateId);
    return {
      statusCode:HttpStatus.OK,
      message:CategoryMessages.DELETED
    }
  }
  @CheckPolicie(Action.Update,Category)
  @ApiOperation({summary:'Update category with id'})
  @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
  @ApiParam({name:'cateId',type:String,required:true,description:"Enter Category Id "})
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({status:HttpStatus.OK,description:'Success'})
  @Put('/update/:cateId')
  async update(@Param('cateId') cateId:string,@Body() categoryDTO:updateCtegoryDTO){
  await this.categoryService.update(cateId,categoryDTO);
  return {
    statusCode:HttpStatus.OK,
    message:CategoryMessages.UPDATED
  }
  }
  @CheckPolicie(Action.Read,Category)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({status:HttpStatus.OK,description:'Success'})
  @Get('/:cateId')
  @ApiParam({name:'cateId',type:String,required:true,description:"Enter Category Id "})
  async findOne(@Param('cateId') cateId:string){
    const categoey=await this.categoryService.findOne(cateId);
    return {
      statusCode:HttpStatus.OK,
      data:categoey
    }
  }
}
