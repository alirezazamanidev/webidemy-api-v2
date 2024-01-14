import { Controller, Get, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { CheckPolicie } from 'src/common/decorators/CheckPolicie.decorator';
import { Action } from 'src/common/enums';
import { SwaggerTags } from 'src/common/enums/swagger.enum';
import { Category } from 'src/modules/category/category.schema';

@ApiTags(SwaggerTags.ADMIN_PANEL)
@Controller('admin')
export class AdminController {
  @ApiOperation({ summary: 'admin panel' })
  @ApiOkResponse({ description: 'ok' })
  
  @Get('/admin')
  async index(@Req() req) {

    return ' admin panel';
  }
}
