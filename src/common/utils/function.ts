
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