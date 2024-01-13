import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContentType } from 'src/common/enums';
import { createRoleDTO } from '../dtos/role.dto';
import { RoleMessages } from '../messages/role.message';

@ApiTags('RBAC(AdminPanel)')
@Controller({
  path: '/admin/role',
})
export class RoleController {
  constructor(private RoleService: RoleService) {}

  @ApiOperation({ summary: 'create role in admin panel' })
  @ApiCreatedResponse({ status: HttpStatus.CREATED, description: 'success' })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request!',
  })
  @ApiServiceUnavailableResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server Error',
  })
  @ApiConsumes(ContentType.URL_ENCODED, ContentType.JSON)
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async create(@Body() roleDTO: createRoleDTO) {
    await this.RoleService.create(roleDTO);
    return {
        statusCode:HttpStatus.CREATED,
        message:RoleMessages.CREATED
    }
  }
}
