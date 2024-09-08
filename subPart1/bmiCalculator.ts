import { isNotNumber } from "./helper";
interface MultiplyValues{
    value1:number;
    value2:number
}
const  parseArguments = (args: string [] ): MultiplyValues =>{
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error ('Too much arguments');
    if(isNotNumber(args[2]) || isNotNumber(args[3])) {throw new Error("provided values were not numbers!");}
    else {
        return {
            value1:Number(args[2]),
            value2:Number(args[3])
        };
    }
};
export const calculateBmi = (height:number,weight:number) : string => {
        if(height === 0 || weight === 0 ){
        throw new Error("height or weightcannot be zero ");
    }

    const bmi: number =  weight/ Math.pow((height /100),2);
    if(bmi < 16) return 'Underweight (Sever thinness)';
    else if(bmi < 16.9) return "Underweight (Moderate thinness)";
    else if(bmi < 18.4) return "Underweight (Mild thinness)";
    else if(bmi < 24.9) return "Normal range";
    else if(bmi < 29.9) return "Overweight(pre-obese)";
    else if (bmi < 34.9) return "Obese(Class |)";
    else if(bmi < 39.9) return "Obese(Class ||)";
    else return "Obese(Class |||)";

};
if (require.main === module) {
try{
    const {value1,value2} = parseArguments(process.argv);
    console.log(calculateBmi(value1,value2));

}catch(error:unknown){
    if(error instanceof Error){
        console.log(error.message);
    }
}
}