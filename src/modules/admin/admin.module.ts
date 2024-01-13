import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from '../category/category.schema';
import { AdminController } from './controllers/admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/common/guards/Role.guard';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'category', schema: categorySchema }]),
  ],
  controllers: [CategoryController, AdminController],
  providers: [
    CategoryService,
   
  ],
})
export class AdminModule {}
