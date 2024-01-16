import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Course } from 'src/common/schemas';
import { createChapterDTO } from '../dtos/capter.dto';
import { ChapterMessages, CourseMessages } from '../messages';

@Injectable()
export class ChapterService {
    constructor(@InjectModel('course') private courseModel:Model<Course>){}

    async create(chapterDTO:createChapterDTO){

        const {title,courseId,text}=chapterDTO;
        await this.checkExist(courseId);
        const chapter=await this.courseModel.findOne({'chapters.title':title});
        if(chapter) throw new BadRequestException(ChapterMessages.ALREADY_EXIST);

        const saveChapterresult = await this.courseModel.updateOne({_id : courseId}, {$push : {
            chapters : {title, text, episodes : []}
        }})
        if(saveChapterresult.modifiedCount===0) throw new InternalServerErrorException('Chapter not saved!');
        
    }
    private async checkExist(courseId: string) {
        if (courseId && !isValidObjectId(courseId))
          throw new BadRequestException(CourseMessages.RequestNotValid);
        const course = await this.courseModel.findById(courseId);
        if (!course) throw new NotFoundException(CourseMessages.NOT_FOUND);
        return course;
      }
    
}
