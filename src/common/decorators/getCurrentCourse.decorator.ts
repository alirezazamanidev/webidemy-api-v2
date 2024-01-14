import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";


export const GetCurrentCourse=createParamDecorator(
    (_:undefined,context:ExecutionContext)=>{

        const ctx=context.switchToHttp();
        const req=ctx.getRequest()
        return {...req.body,photo:req?.file,userId:req?.user?._id}
        
    }
)