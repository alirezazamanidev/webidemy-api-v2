import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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
  ApiTags,
} from '@nestjs/swagger';
import { ContentType } from 'src/common/enums/swagger.enum';
import { createCategoryDTO } from '../dtos/category.dto';
import { CategoryService } from '../services/category.service';
import { CategoryMessages } from '../messages';
import { ApiPaginatedResponse } from 'src/common/decorators';
import { PaginatedDto, QueryPaginateDTO } from 'src/common/dtos';
import { CategoryDocument, CategoryModel, categorySchema } from 'src/modules/category/category.schema';

@ApiTags('Category(AdminPanel)')
@Controller({
  path: 'admin/category',
})
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
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
  @ApiPaginatedResponse(CategoryModel)
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
  async listOfCategories(@Query() QueryPaginateDTO: QueryPaginateDTO):Promise<PaginatedDto<CategoryDocument>> {
    const data = await this.categoryService.listOfCategories(QueryPaginateDTO);
    return data
  }
  @ApiParam({
    name:'cateId',
    type:String,
    required:true
  })
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
}
