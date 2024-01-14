import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { createCourseDTO } from '../dtos/course.dto';
import { Action, ContentType } from 'src/common/enums';
import { CheckPolicie, GetCurrentCourse } from 'src/common/decorators';
import { UploadFile } from 'src/common/decorators/uploadFile.decorator';
import { Course } from 'src/modules/course/course.schema';

@ApiSecurity('access_token')
@ApiTags('Course(AdminPanel)')
@Controller({
    path:'/admin/course'
})
export class CourseController {

    constructor(){}

    @ApiOperation({summary:"Create new course in admin panel."})
    @ApiConsumes(ContentType.MULTIPART)
    @ApiBody({type:createCourseDTO})
    @UploadFile('photo')
    @HttpCode(HttpStatus.CREATED)
    @Post('/create')
    async create(@GetCurrentCourse() courseDTO:createCourseDTO){
        
       return {
        courseDTO,
       }
    }
}
