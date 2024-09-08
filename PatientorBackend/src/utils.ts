import {  NewPatient } from "./types";
import { newPatientSchema } from "./types";
/*const isString = (str:unknown): str is string =>{
    return (typeof str ==='string' || str instanceof String);
};
const isDate = (str : string ): boolean =>{
    return Boolean(Date.parse(str));
};
const isGender =( str : string) : str is Gender =>{
    return Object.values(Gender).map(v=>v.toString()).includes(str);
};
const parseGender = (str: unknown ): Gender =>{
    if(!str || !isString(str) || ! isGender(str)){
        throw new Error('malformated parameters: ' + str);
    }
    return str;
};
const parseString = (str:unknown) : string =>{
    if(!str || !isString(str)){
        throw new Error("malformated parameters : " + str);
    }
    return str;
};

const parseDate = (str: unknown) : string =>{
    if(!str || !isString(str) || !isDate(str)){
        throw new Error("malformated parameters");

    }
    return str;
};
*/

export const toNewPatient = ( object: unknown) : NewPatient =>{

    if(!object || typeof object !== 'object'){
        throw new Error("malformated parameters");
    }if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && "occupation" in object  ){
      return newPatientSchema.parse(object);
 
    }
    throw new Error("Missing parameters");

};