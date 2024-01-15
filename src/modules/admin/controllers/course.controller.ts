import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { createCourseDTO } from '../dtos/course.dto';
import { Action, ContentType } from 'src/common/enums';
import { CheckPolicie, GetCurrentCourse } from 'src/common/decorators';
import { UploadFile } from 'src/common/decorators/uploadFile.decorator';
import { Course } from 'src/modules/course/course.schema';
import { CourseService } from '../services/course.service';
import { CourseMessages } from '../messages';
@ApiSecurity('access_token')
@ApiTags('Course(AdminPanel)')
@Controller({
    path:'/admin/course'
})
export class CourseController {

    constructor(private courseService:CourseService){}

    
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
}
