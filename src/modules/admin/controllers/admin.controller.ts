import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from 'src/common/enums/swagger.enum';

@ApiTags(SwaggerTags.ADMIN_PANEL)
@Controller('admin')
export class AdminController {}
