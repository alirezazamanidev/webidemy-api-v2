import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/modules/course/course.schema';
import { createCourseDTO } from '../dtos/course.dto';
import { parse } from 'path';

@Injectable()
export class CourseService {

    constructor(@InjectModel('course') private courseModel:Model<Course>){}

    async create(courseDTO:createCourseDTO){
        const {title,short_text,text,tags,photo,price,type}=courseDTO;

        const image=this.getUrlPhoto(`${photo.destination}/${photo.filename}`);
        

    }
    getUrlPhoto(dir:string){
        return dir.substring(8);
    
    }
}
