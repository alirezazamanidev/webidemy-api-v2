import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { chapterIdParamsDTO, createChapterDTO } from '../dtos/chapter.dto';
import { ChapterMessages } from '../messages';
import { ChapterService } from '../services/chapter.service';
import { Action, ContentType } from 'src/common/enums';
import { CheckPolicie } from 'src/common/decorators';
import { Course } from 'src/common/schemas';

@ApiTags('Chapter(AdminPanel)')
@Controller({
    path:'admin/chapter'
})
export class ChapterController {
    constructor(private chapterService:ChapterService){}
    @CheckPolicie(Action.Create,Course)
    @ApiOperation({summary:'create chapter for course'})
    @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
    @ApiCreatedResponse({status:HttpStatus.OK,description:'Success'})
    @ApiBadRequestResponse({status:HttpStatus.BAD_REQUEST,description:'Bad Request'})
    @ApiNotFoundResponse({status:HttpStatus.NOT_FOUND,description:"Not Founded!"})
    @ApiBody({type:createChapterDTO})
    @HttpCode(HttpStatus.CREATED)
    @Post('/create')
    async create(@Body() chapterDTO:createChapterDTO){
        await this.chapterService.create(chapterDTO);
        return {
            statusCode:HttpStatus.CREATED,
            messagee:ChapterMessages.CREATED
        }
    }
    @HttpCode(HttpStatus.OK)
    @CheckPolicie(Action.Delete,Course)
    @ApiOkResponse({status:HttpStatus.OK,description:'Success'})
    @ApiNotFoundResponse({status:HttpStatus.NOT_FOUND,description:'not Found'})
    @ApiBadRequestResponse({status:HttpStatus.OK,description:'Bad request'})
    @ApiParam({name:'chapterId',type:String,required:true,description:'Enter object id for delete chapter' })
    @Delete('/remove/:chapterId')
    async remove(@Param() {chapterId}:chapterIdParamsDTO){

    await this.chapterService.remove(chapterId);
    return {
        status:HttpStatus.OK,
        message:ChapterMessages.DELETED
    }
    }

    @ApiOperation({summary:'Get Chapters of course by courseId'})
    @CheckPolicie(Action.Read,Course)
    @ApiOkResponse({status:HttpStatus.OK,description:'Success'})
    @ApiNotFoundResponse({status:HttpStatus.NOT_FOUND,description:'not Found'})
    @ApiBadRequestResponse({status:HttpStatus.OK,description:'Bad request'})
    @ApiParam({name:'courseId',type:String,required:true,description:'Enter object id for get chapters of course' })
    @Get('/:courseId')
    async find(@Param('courseId') courseId:string){

        return {
            statusCode:HttpStatus.OK,
            data:await this.chapterService.find(courseId)
        }
    }

}
