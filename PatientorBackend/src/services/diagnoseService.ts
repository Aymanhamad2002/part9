import { diagnoseData } from "../types";
import  diagnosesData  from "../../data/diagnosesdata";
const  getDiagnoses = () : diagnoseData []  => {
    return diagnosesData;
};

export default {getDiagnoses};