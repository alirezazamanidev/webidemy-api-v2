import { diskStorage } from 'multer';
import * as path from 'path';
import {existsSync, mkdirSync} from 'fs'
const createRoute = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDay();

  return `./public/uploads/images/courses/${year}/${month}/${day}`;
};
export const ImageStorage = diskStorage({
  destination: (req, file, cb) => {
    const dir=createRoute();

    mkdirSync(path.join(process.cwd(), dir), {recursive: true});
    
    cb(null, dir);
  },
  filename: (req, file, cb) => {

    const filePath = createRoute() + '/' + file.originalname;
    if (existsSync(filePath)) cb(null, file.originalname);
    else cb(null, Date.now() + '-' + file.originalname);
  },
});
