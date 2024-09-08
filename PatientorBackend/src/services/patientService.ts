import { Entry, newEntry, NewPatient, NonSensitivePatientData, patientData } from "../types";
import  patientsData from '../../data/patientsdata';
import {v1 as uuid} from 'uuid';


const getNonSensitivePatientData = () : NonSensitivePatientData []=>{
    return patientsData.map(({id,name,dateOfBirth,gender,occupation,entries}) =>
        ({id,name,dateOfBirth,gender,occupation,entries}));
};

const findById = (id: string): patientData |undefined =>{
    return patientsData.find(s => s.id === id);
};

const addPatient = (patient : NewPatient) : patientData=> {

    const id :string = uuid() ;    
    const newp = {...patient,id};
    patientsData.push(newp);
    return newp;
};
const updatePatient = (entry:newEntry,id:string): patientData | undefined => {
   
    const entryId :string  = uuid();
    const patient = patientsData.find((p) => p.id === id) ;
    if(!patient){
        return undefined;
    }
    const FullEntry : Entry= {id:entryId,...entry};
    const newPatient : patientData = {...patient,entries: patient.entries.concat(FullEntry)};
    patientsData.forEach((p,i) => {
        if(p.id ===id){
            patientsData[i] = newPatient;
        }
    });
    return newPatient;


    
};
export default {getNonSensitivePatientData,addPatient,findById,updatePatient  };