import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientsService from "../../services/patients";
import { Box, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import {  Diagnosis, newEntry, Patient } from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from "./EntryDetails";
import NewHealthCheck from "./form/NewHealthCheck";


const PatientItem = ({diagnoses,setPatients,patients}:{patients:Patient[];diagnoses:Diagnosis[];setPatients:React.Dispatch<React.SetStateAction<Patient[]>>}) => {
  const { id } = useParams<{ id: string }>();
  const [description,setDescription] = useState<string>('');
  const [date,setDate] = useState<string>('');
  const [specialist,setSpecialList] = useState<string>('');
  const [diagCode ,setDiagCode] = useState<Array<string>>([]);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const patientData = await patientsService.findPatient(id);
          setPatient(patientData);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography align="center">Loading...</Typography>;
  }
  const createEntry = async (id:string,newObject:newEntry) =>{
    try{
      const updatedpatient :Patient  = await patientsService.updatePatient(id,newObject);
      setPatients(patients.map(p => p.id !== patient.id ? p :updatedpatient));
      setPatient(updatedpatient);
      
    }catch(error:unknown){console.log("fault");}
};

  return (
    <Box>
      <Typography  variant="h3">
      {patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <p><strong>entries</strong></p>
      {patient.entries.map((e, index) => (
    <div key={index}>
        <EntryDetails entry ={e} />
    </div>
))}
<NewHealthCheck createEntry={createEntry} description={description} setDescription={setDescription} setDate={setDate} date ={date} specialist={specialist} setSpecialList={setSpecialList} diagCode={diagCode} setDiagCode={setDiagCode} diagnoses={diagnoses} id ={patient.id} />
    </Box>
  );
};


export default PatientItem;