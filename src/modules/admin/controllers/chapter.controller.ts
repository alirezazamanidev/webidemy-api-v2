import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createChapterDTO } from '../dtos/capter.dto';
import { ChapterMessages } from '../messages';
import { ChapterService } from '../services/chapter.service';
import { ContentType } from 'src/common/enums';

@ApiTags('Chapter(AdminPanel)')
@Controller({
    path:'admin/chapter'
})
export class ChapterController {
    constructor(private chapterService:ChapterService){}
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
}
