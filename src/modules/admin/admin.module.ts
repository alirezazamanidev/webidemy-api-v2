import {  Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from '../category/category.schema';
import { AdminController } from './controllers/admin.controller';
import { RoleSchema } from 'src/common/schemas/Role.schema';
import { PermissionSchema } from 'src/common/schemas/permission.schema';
import { CaslModule } from '../casl/casl.module';
import { courseSchema } from '../course/course.schema';
import { CourseController } from './controllers/course.controller';
import { CourseService } from './services/course.service';
@Module({
  imports: [
    CaslModule,
    MongooseModule.forFeature([
      { name: 'category', schema: categorySchema },
      {
        name: 'role',
        schema: RoleSchema,
      },
      { name: 'permission', schema: PermissionSchema },
      {
        name:'course', schema:courseSchema
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
