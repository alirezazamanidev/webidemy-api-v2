import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums/swagger.enum';
import { createCategoryDTO } from '../dtos/category.dto';
import { PaginatedDto } from 'src/common/dtos/Paginate.dto';
import { categoryDocumemnt } from 'src/modules/category/category.schema';
import { CategoryService } from '../services/category.service';
import { CategoryMessages } from '../messages';

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
}
