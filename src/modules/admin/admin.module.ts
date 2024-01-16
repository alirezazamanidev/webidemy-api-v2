import {  Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from '../../common/schemas/category.schema';
import { AdminController } from './controllers/admin.controller';
import { CaslModule } from '../casl/casl.module';
import { courseSchema } from '../../common/schemas/course.schema';
import { CourseController } from './controllers/course.controller';
import { CourseService } from './services/course.service';
import { User, UserSchema } from '../user/user.schema';
@Module({
  imports: [
    CaslModule,
    MongooseModule.forFeature([
      { name: 'category', schema: categorySchema },
     
      {
        name:'course', schema:courseSchema
      },{
        name:User.name,schema:UserSchema
      }
    ]),
  ],
  controllers: [
    CategoryController,
    AdminController,
    CourseController,
  ],
  providers: [CategoryService, CourseService],
})
export class AdminModule  {

}
