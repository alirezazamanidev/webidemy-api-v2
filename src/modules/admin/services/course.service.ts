import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from 'src/modules/course/course.schema';
import { createCourseDTO } from '../dtos/course.dto';
import { parse } from 'path';
import { StringToArray } from 'src/common/utils/function';
import { CourseMessages } from '../messages';
import { QueryPaginateDTO } from 'src/common/dtos';

@Injectable()
export class CourseService {
  constructor(@InjectModel('course') private courseModel: Model<Course>) {}

  async create(courseDTO: createCourseDTO) {
    const {
      userId,
      title,
      short_text,
      category,
      text,
      tags,
      photo,
      price,
      type,
    } = courseDTO;
    const course=await this.courseModel.findOne({title});
    if(course)
       throw new BadRequestException(CourseMessages.ALREADY_EXIST); 
    const image = this.getUrlPhoto(`${photo.destination}/${photo.filename}`);
    const allTags = StringToArray(tags);
    const newCourse = await this.courseModel.create({
      teacher: new Types.ObjectId(userId),
      title,
      short_text,
      text,
      category:new Types.ObjectId(category),
      photo: image,
      tags: allTags,
      price: type === 'free' ? 0 : price,
      type,
    });

    if(!newCourse) throw new InternalServerErrorException('Not Saved!');
    
  }
  async ListOfCourses(QueryPaginateDTO:QueryPaginateDTO){
    const {page,limit}=QueryPaginateDTO;
    let Page= parseInt(page) || 1;
    let Limit = parseInt(limit) || 8;
    let skip = (Page - 1) * Limit;
   
    
    const courses=await this.courseModel.find({}).skip(skip)
    .limit(Limit)
    return {
        page:Page,
        limit:Limit,
        data:courses
    }
  }
  private getUrlPhoto(dir: string) {
    return dir.substring(8);
  }
}
