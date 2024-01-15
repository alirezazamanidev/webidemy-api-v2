import { HttpStatus, Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from '../dtos/Paginate.dto';
import { CategoryModel } from 'src/modules/category/category.schema';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDto, model),
    ApiOkResponse({
      status:HttpStatus.OK,
      description:"Get Pagination Data",
      
      schema: {
        
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              page: {
                type: 'number',
                example: 1,
              },
              limit: {
                type: 'number',
                example: 8,
              },
              data: {
                type: 'array',
                items: {
                  type:'object',
                  $ref:getSchemaPath(model)
                 },
              },
            },
          },
        ],
      },
    }),
  );
};
