import { ArgumentMetadata, Injectable ,PipeTransform, ValidationError, ValidationPipe} from "@nestjs/common";
import ValidationException from "../exceptions/validation.exception";
import { parse } from "path";
import { deleteFileInPublic } from "../utils/function";
import { ValidatorOptions } from "@nestjs/common/interfaces/external/validator-options.interface";


@Injectable()
export class ValidationPipeErorr extends ValidationPipe {

constructor(){
    super({
        validateCustomDecorators:true,
        
        exceptionFactory(errors) {
        
        
        const messages: object[] = errors.map(err => ({
          [err.property]: Object.values(err.constraints),
        }));
       
        return new ValidationException(messages);
            
        },
    })

}

}