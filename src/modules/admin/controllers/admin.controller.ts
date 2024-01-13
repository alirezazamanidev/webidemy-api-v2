import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators';
import { Auth } from 'src/common/decorators/Auth.decorator';
import { Role } from 'src/common/enums';
import { SwaggerTags } from 'src/common/enums/swagger.enum';
import { RoleGuard } from 'src/common/guards/Role.guard';

@ApiTags(SwaggerTags.ADMIN_PANEL)
@Controller('admin')
export class AdminController {


    @Roles(Role.USER)
    @ApiHeader({name:'access_token'})
    @ApiOperation({summary:"admin panel"})
    @ApiOkResponse({description:'ok'})
    @Get('/admin')
    async index(@Req() req){
        
        
        return 'hello admin panel';
    }
}
