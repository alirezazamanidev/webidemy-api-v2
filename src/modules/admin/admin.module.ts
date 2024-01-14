import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from '../category/category.schema';
import { AdminController } from './controllers/admin.controller';

import { AuthGuard } from '@nestjs/passport';
import { RoleController } from './controllers/role.controller';
import { RoleService } from './services/role.service';
import { RoleSchema } from 'src/common/schemas/Role.schema';
import { PermissionSchema } from 'src/common/schemas/permission.schema';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controllers/permission.controller';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    CaslModule,
    MongooseModule.forFeature([{ name: 'category', schema: categorySchema },{
      name:'role',schema:RoleSchema
    },{name:'permission',schema:PermissionSchema}]),
  ],
  controllers: [CategoryController, AdminController, RoleController, PermissionController],
  providers: [
    CategoryService,
    RoleService,
    PermissionService,
   
  ],
})
export class AdminModule {}
