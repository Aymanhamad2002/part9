import express from 'express';
import { MultipleValues,toExValues,toMultipleValues } from './utils';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
app.get('/hello',(_req,res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi',(req,res) => {
    try {
        const values: MultipleValues = toMultipleValues(req.query);
        const result = calculateBmi(values.height,values.weight);
        res.json({...values,bmi:result});
    }catch(error:unknown){
        if(error instanceof Error){
            res.status(400).json({error:"malformatted parameters"});
        }
    }
});
app.post('/exercises',(req,res) => {
    try{
        const values = toExValues(req.body);
        res.json(calculateExercises(values.daily_exercises,values.target));

    }catch(error:unknown){
        if(error instanceof Error){
            res.status(400).json({error:error.message});
        }
    }
    

});
const PORT = 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});