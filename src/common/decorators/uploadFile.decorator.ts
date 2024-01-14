import { UseInterceptors, applyDecorators } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageStorage } from "../utils/multer";

export const UploadFile = (data: string) => {
    return applyDecorators(
      UseInterceptors(
        FileInterceptor(data, {
          storage: ImageStorage,
          
        }),
      ),
    );
  };