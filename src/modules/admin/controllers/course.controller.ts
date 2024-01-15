import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { createCourseDTO } from '../dtos/course.dto';
import { Action, ContentType } from 'src/common/enums';
import { ApiPaginatedResponse, CheckPolicie, GetCurrentCourse } from 'src/common/decorators';
import { UploadFile } from 'src/common/decorators/uploadFile.decorator';
import { Course } from 'src/modules/course/course.schema';
import { CourseService } from '../services/course.service';
import { CourseMessages } from '../messages';
import { PaginatedDto, QueryPaginateDTO } from 'src/common/dtos';
@ApiTags('Course(AdminPanel)')
@Controller({
    path:'/admin/course'
})
export class CourseController {

    constructor(private courseService:CourseService){}

    @CheckPolicie(Action.Create,Course)
    @ApiOperation({summary:"Create new course in admin panel."})
    @ApiConsumes(ContentType.MULTIPART)
    @ApiBody({type:createCourseDTO})
    @UploadFile('photo')
    @HttpCode(HttpStatus.CREATED)
    @Post('/create')
    async create(@GetCurrentCourse() courseDTO:createCourseDTO){

        
        await this.courseService.create(courseDTO);
       return {
        statusCode:201,
        message:CourseMessages.CREATED
       }
    }

    @CheckPolicie(Action.Read,Course)
    @ApiOperation({summary:'GET List of courses'})
    @ApiPaginatedResponse(Course)
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
      // @UsePipes(new TransformData())
      @HttpCode(HttpStatus.OK)
      @Get('/list')
      async listOfCourses(@Query() QueryPaginateDTO:QueryPaginateDTO){
         
        return {
            statusCode:HttpStatus.OK,
            data:await this.courseService.ListOfCourses(QueryPaginateDTO)
        }
      }
   
}
