import { isNotNumber } from "./helper";

interface Result {
    periodLength : number;
    trainingDays: number;
    sucess: boolean;
    rating :number;
    ratingDescription: string;
    target : number;
    average: number;
}
const parseArguments = (args:string[]): number[] => {
    if(args.length < 3) throw new Error('not enough arguments');
    const numbers = [];
    for( let   i = 2 ; i< args.length;i++){
        if(isNotNumber(args[i])){
            throw new Error('provided values are not numbers');

        }else{
            numbers[i-2] = Number(args[i]);
        }

    }
    return numbers;
};
export const calculateExercises = (hours : number[],target:number) : Result  => {
    const periodLength: number = hours.length;
    const trainingDays: number = hours.filter(hour => hour !== 0 ).length;
    const sum : number = hours.reduce((sum , value)=> sum +value,0);
    const average : number = sum/periodLength;
    let sucess : boolean = false;
    let rating : number = 1;
    let ratingDescription = '';

    if(average >= target) {
        sucess = true ;
        rating = 3;
        ratingDescription = "you did good you reached the target";
    }
    else if(average < target && average> target - 0.5){
        rating = 2;
        ratingDescription = "not too bad but could be better";
    }else{
        rating = 1;
        ratingDescription = "you did bad";
    };



    return{
        periodLength,
        trainingDays,
        sucess,
        rating ,
        ratingDescription,
        target ,
        average
    };

};
if(require.main === module){
    try{
        const numbers : number [] = parseArguments(process.argv);
        console.log(calculateExercises(numbers.slice(1),numbers[0]));
    
    }catch(error:unknown){
        if(error instanceof Error){
            console.log(error.message);
        }
    }

}

