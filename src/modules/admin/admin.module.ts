import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from '../category/category.schema';
import { AdminController } from './controllers/admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/common/guards/Role.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { RoleSchema } from 'src/common/schemas/Role.schema';
import { PermissionSchema } from 'src/common/schemas/permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'category', schema: categorySchema },{
      name:'role',schema:RoleSchema
    },{name:'permission',schema:PermissionSchema}]),
  ],
  controllers: [CategoryController, AdminController, RoleController],
  providers: [
    CategoryService,
    RoleService,
   
  ],
})
export class AdminModule {}
