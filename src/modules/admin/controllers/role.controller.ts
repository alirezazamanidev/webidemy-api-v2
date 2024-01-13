import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContentType } from 'src/common/enums';
import { createRoleDTO, updateRoleDTO } from '../dtos/role.dto';
import { RoleMessages } from '../messages';
import { QueryPaginateDTO } from 'src/common/dtos';

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

  @ApiOperation({summary:'Get list of roles'})
  @ApiQuery({name:'limit',type:String,required:false})
  @ApiQuery({name:'page',type:String,required:false})
  @ApiOkResponse({description:'success'})
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  async listofRoles(@Query() QueryPaginateDTO:QueryPaginateDTO){
    const data=await this.RoleService.listofRoles(QueryPaginateDTO);
    return {
        statusCode:HttpStatus.OK,
        data
    }

  }
  @ApiOperation({summary:'Get One Role with object Id'})
  @ApiParam({name:'roleId',type:String, description:'Enter object id for get role'})
  @ApiOkResponse({status:HttpStatus.OK,description:'success'})
  @ApiBadRequestResponse({status:HttpStatus.BAD_REQUEST,description:'bad request!'})
  @ApiNotFoundResponse({status:HttpStatus.NOT_FOUND,description:'Not Founded!'})
  @HttpCode(HttpStatus.OK)
  @Get(':roleId')
  async findOne(@Param('roleId') roleId:string){
    
    return {
        statusCode:HttpStatus.OK,
        data:await this.RoleService.findOne(roleId)
    }

  }

  @ApiOperation({summary:'Delete one role'})
  @HttpCode(HttpStatus.OK)
  @ApiParam({name:'roleId', description:"Enter role object id for delete!"})
  @Delete('/remove/:roleId')
  async remove(@Param('roleId') roleId:string){
    await this.RoleService.remove(roleId);
    return {
        statusCode:HttpStatus.OK,
        message:RoleMessages.DELETED
    }
  }

  @ApiOperation({summary:"Update one role"})
  @ApiParam({name:'roleId',description:'Enter object id for update role'})
  @ApiOkResponse({description:'success'})
  @ApiBadRequestResponse({description:'bad request'})
  @ApiInternalServerErrorResponse({description:'Server Eroor!'})
  @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
  @HttpCode(HttpStatus.OK)
  @Patch('/update/:roleId')
  async update(@Body() roleDTO:updateRoleDTO,@Param('roleId') roleId:string){
    await this.RoleService.update(roleId,roleDTO);
    return {
        statusCode:HttpStatus.OK,
        message:RoleMessages.UPDATED
    }

  }

}
