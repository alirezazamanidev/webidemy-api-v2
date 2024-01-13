import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiServiceUnavailableResponse, ApiTags } from '@nestjs/swagger';
import { PermissionMessages } from '../messages/permission.message';
import { createPermissionDTO, updatePermissionDTO } from '../dtos/permission.dto';
import { ContentType } from 'src/common/enums';
import { QueryPaginateDTO } from 'src/common/dtos';
import { PermissionService } from '../services/permission.service';
@ApiTags('RBAC(AdminPanel)')
@Controller(
{
    path:'/admin/permission'
}
)
export class PermissionController {
    constructor(private permissionService: PermissionService) {}

    @ApiOperation({ summary: 'create permission in admin panel' })
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
    async create(@Body() permissionDTO: createPermissionDTO) {
      await this.permissionService.create(permissionDTO);
      return {
          statusCode:HttpStatus.CREATED,
          message:PermissionMessages.CREATED
      }
    }
  
    @ApiOperation({summary:'Get list of roles'})
    @ApiQuery({name:'limit',type:String,required:false})
    @ApiQuery({name:'page',type:String,required:false})
    @ApiOkResponse({description:'success'})
    @HttpCode(HttpStatus.OK)
    @Get('/list')
    async listofRoles(@Query() QueryPaginateDTO:QueryPaginateDTO){
      const data=await this.permissionService.listofRoles(QueryPaginateDTO);
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
          data:await this.permissionService.findOne(roleId)
      }
  
    }
  
    @ApiOperation({summary:'Delete one role'})
    @HttpCode(HttpStatus.OK)
    @ApiParam({name:'roleId', description:"Enter role object id for delete!"})
    @Delete('/remove/:roleId')
    async remove(@Param('roleId') roleId:string){
      await this.permissionService.remove(roleId);
      return {
          statusCode:HttpStatus.OK,
          message:PermissionMessages.DELETED
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
    async update(@Body() roleDTO:updatePermissionDTO,@Param('roleId') roleId:string){
      await this.permissionService.update(roleId,roleDTO);
      return {
          statusCode:HttpStatus.OK,
          message:PermissionMessages.UPDATED
      }
  
    }

}
