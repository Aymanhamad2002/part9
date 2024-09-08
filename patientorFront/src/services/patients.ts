import axios from "axios";
import { Patient, PatientFormValues,newEntry} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};
const findPatient = async (id:string) =>{
  const fullUrl = `${apiBaseUrl}/patients/${id}`;
  const response = await axios.get<Patient>(fullUrl);
  return response.data;
};
const updatePatient = async (id:string,entry:newEntry): Promise<Patient> =>{
  const fullUrl = `${apiBaseUrl}/patients/${id}/entries`;
  const response = await axios.post<Patient>(fullUrl,entry);
  return response.data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, create,findPatient,updatePatient
};

