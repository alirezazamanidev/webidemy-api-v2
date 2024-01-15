import { BadRequestException, UseInterceptors, applyDecorators } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageStorage } from "../utils/multer";
import { extname } from "path";

export const UploadFile = (data: string) => {
    return applyDecorators(
      UseInterceptors(
        FileInterceptor(data, {
          storage: ImageStorage,
          fileFilter(req, file, cb) {
            const ext = extname(file.originalname);
            const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
            if (mimetypes.includes(ext)) {
              return cb(null, true);
            }
            return cb(new BadRequestException('فرمت فایل ارسال شده از فرمت فایل تصاویر نیست!'),null);
          },
          
        }),
      ),
    );
  };