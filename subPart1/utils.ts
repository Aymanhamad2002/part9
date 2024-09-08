export interface MultipleValues{
    height:number;
    weight:number;
};
export interface ExerciseValues{
    daily_exercises:number[];
    target:number;
};
const isNumber = (value: unknown) :value is number => {
    return typeof value ==='number';
    
};
const parseValue = (value: unknown) : number =>{
    if(!isNumber(value)){
        throw new Error("malformatted parameters");
    }else{
        return value;
    }
};


const isString = (str:unknown): str is string =>{
  return typeof str === 'string' || str instanceof String;

};
const parseValues = (value : unknown) : number => {
    if(!value || !isString(value) || isNaN(Number(value))){
        throw new Error('Incorrect or missing number');

    }
    return Number(value);
};
export  const toExValues = (object :unknown) : ExerciseValues => {
    if(!object || typeof object !== 'object'){
        throw new Error("malformated parameters");
    }
    if("daily_exercises" in object && "target" in object){
        const arr = object.daily_exercises as number[];
        const entry = {
        
            daily_exercises:arr.map(m => parseValue(m)),
            target: parseValue(object.target)
        };
        return entry;
        
    }
    throw new Error("parameters missing");
};

export const toMultipleValues = (object: unknown) : MultipleValues =>{
    if(! object || typeof object !=='object'){
        throw new Error('Incorrect or missing data');
    }
    if('height' in object && 'weight' in object){
        const values :MultipleValues = {
            height : parseValues(object.height),
            weight : parseValues(object.weight)
        
            
        };
        return values;

    }
    throw new Error('Incorrect data : some field are missing');

};