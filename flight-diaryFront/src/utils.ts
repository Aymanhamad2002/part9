
import { newDiary, newDiarySchema } from "./types";

export const toNewDiary = (object:unknown) : newDiary =>{
    if(! object || typeof object !== 'object'){
        throw new Error('Inccorect or missing data');
    }
    if('date' in object && 'weather' in object && 'visibility' in object){
        return newDiarySchema.parse(object);
        
    }
    throw new Error('missing parameters');

}