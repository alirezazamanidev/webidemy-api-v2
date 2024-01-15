import { ExecutionContext, applyDecorators, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { createCourseDTO } from "src/modules/admin/dtos/course.dto";


export const GetCurrentCourse=createParamDecorator(

    (_:undefined,context:ExecutionContext):createCourseDTO=>{

        const ctx=context.switchToHttp();
        const req=ctx.getRequest()
  
        return {...req.body,photo:req.file,userId:req?.user?._id};
    }
)