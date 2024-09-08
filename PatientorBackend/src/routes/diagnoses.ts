import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { diagnoseData } from '../types';

import { Response} from 'express';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/',(_req,res:Response<diagnoseData[]>) =>{
    res.json(diagnoseService.getDiagnoses());
});
export default diagnoseRouter;