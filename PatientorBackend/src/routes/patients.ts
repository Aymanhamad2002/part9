import express, { NextFunction } from 'express';
import { Response,Request } from 'express';
import { newEntry, newEntrySchema, NewPatient, newPatientSchema, NonSensitivePatientData, patientData } from '../types';

import patientService from '../services/patientService';
import { z } from 'zod';




const patientRouter = express.Router();
const errorMiddleware =(error: unknown,_req:Request,res:Response,next:NextFunction) => {
    if(error instanceof z.ZodError){
        res.status(400).send({error:error.issues});
    }else{
        next(error);
    }

};

const newPatientParser = (req:Request, _res:Response,next:NextFunction)=>{
    try{
        newPatientSchema.parse(req.body);
        next();

    }catch(error:unknown){
        next(error);
    }
};
const newEntryParser = (req:Request ,_res :Response ,next:NextFunction)=>{
    try {
        newEntrySchema.parse(req.body);
        next();
    }catch(error:unknown){
        next(error);
    }
};

patientRouter.get('/',(_req,res :Response<NonSensitivePatientData[]>) =>{
    res.json(patientService.getNonSensitivePatientData());
});
patientRouter.get('/:id',(req,res:Response<patientData >) =>{
    if(patientService.findById(req.params.id)) { 
        res.json(patientService.findById(req.params.id));
    }else{
        res.status(404).end();
    }

});
patientRouter.post(
    '/:id/entries',
    newEntryParser,
    (req: Request<{id:string}, unknown, newEntry>, res: Response<patientData>) => {
      const patientId: string = req.params.id; // Now TypeScript knows this is a string
      const patient = patientService.updatePatient(req.body, patientId);
  
      if (!patient) {
        return res.status(404);
      } else {
        return res.json(patient);
      }
    }
  );





patientRouter.post('/',newPatientParser,(req:Request<unknown,unknown,NewPatient>,res:Response<patientData>)=>{
        res.status(201).json(patientService.addPatient(req.body));
    }

);
patientRouter.use(errorMiddleware);

export default patientRouter;

