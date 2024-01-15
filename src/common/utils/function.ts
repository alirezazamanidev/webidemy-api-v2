import { existsSync, unlinkSync } from "fs";
import { join } from "path";

export function StringToArray(data:string |string[]){

    if(typeof data =='string'){

        if(data.indexOf('#') >=0){
            return (data.split("#")).map(item => item.trim())
        }
        else if(data.indexOf(',') >=0){
            return (data.split(",")).map(item => item.trim())
        }
        else {
            return [data];
        }

    }
    else if(Array.isArray(data)){
        data = data.map(item => item.trim())
        data= [... new Set(data)];
        return data;
    }else {
        return [];
    }
}

export function deleteFileInPublic(fileAddress:string) {
    if (fileAddress) {
        const pathFile =join(__dirname, "..", "..","..", "public", fileAddress)
        if (existsSync(pathFile)) unlinkSync(pathFile)
    }
}