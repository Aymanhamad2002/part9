import { Visibility, Weather } from "../types";
import React from "react";
import { useRef } from "react";

const AddForm = ({addNew}: { addNew: (object: unknown) => void}) =>{
    const dateRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const visibilityRef = useRef<HTMLInputElement []>([]);
    const weatherRef = useRef <HTMLInputElement []>([]);

    
    const createNew =async  (event:React.SyntheticEvent) => {
        event.preventDefault();
        const visibility = visibilityRef.current.find(v => v.checked)?.value;
        const weather = weatherRef.current.find(v => v.checkValidity)?.value;
        const data = {
            visibility,
            weather,
            comment : commentRef.current?.value,
            date : dateRef.current?.value
        }
        await addNew(data);
        if(dateRef.current) dateRef.current.value = '';
        if(commentRef.current) commentRef.current.value = '';
        visibilityRef.current.forEach((input) => (input.checked = false));
        weatherRef.current.forEach((input) => (input.checked = false));
        

        
        

    }
    return(<div>
        <form onSubmit = {createNew}>
            <div><input ref = {dateRef} type ='date'/></div>
            <div>
                visibility: {Object.values(Visibility).map( (v,index) => {
                    return(
                    <React.Fragment key = {v.toString()}  >
                    {v.toString()}<input name ='visibility' ref = {(el) =>visibilityRef.current[index] = el!}value ={v.toString()} type = 'radio'/>   
                </React.Fragment>)
                })}
                
            </div>
            <div>
            weather :  {Object.values(Weather).map((v,index) =>
            {
                return(<React.Fragment key ={v.toString()}>
                {v.toString()}<input name ='weather' ref = {el => weatherRef.current[index] = el!} value = {v.toString()} type='radio' />    
                </React.Fragment>
                )
            })}
            </div>
            comment: <input  ref = {commentRef} name = 'text' />
            <button type ='submit'>ADD</button>
        </form>
    </div>);
}
export default AddForm;