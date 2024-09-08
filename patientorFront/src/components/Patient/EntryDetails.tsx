import { Entry } from "../../types";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import Occupational from "./Occupational";

interface Props{
    entry:Entry
}
const  EntryDetails = ({entry}:Props) =>{
    const assertNever = (value : never) : never =>{
        throw new Error(`Unhandled discriminated union member:${JSON.stringify(value)}`);
    };

    switch(entry.type){
        case "Hospital":
            return <Hospital entry ={entry} />;
        case "HealthCheck":
            return <HealthCheck entry ={entry} />;
        case "OccupationalHealthcare":
            return <Occupational entry = {entry} />;
        default:
         assertNever(entry);

    }


};
export default EntryDetails;