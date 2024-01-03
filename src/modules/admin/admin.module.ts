import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import categorySchema  from '../category/category.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'category',schema:categorySchema}])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class AdminModule {}
