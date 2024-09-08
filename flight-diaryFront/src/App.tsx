import { useState,useEffect } from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import { Diary } from "./types";
import diaryService from "./services/diaryService";
import AddForm from "./components/AddForm";
import Notification from "./components/Notifiction";
import { toNewDiary } from "./utils";
import { z } from "zod";


const App = () =>{
const [diaries,setDiaries] = useState<Diary[]>([]);
const [message,setMessage] = useState<string>('');
const addNew = async (object: unknown) => {
  try{
    const newItem = toNewDiary(object);
    const  item =await  diaryService.createDirary(newItem);
      setDiaries(diaries.concat(item));
      setMessage('a new Diary has been added');
      setTimeout(() =>{
        setMessage('');
      },30000);

    }
      
  catch(error:unknown) {
    if(error instanceof z.ZodError){
      setMessage(error.message);
    }else if(error instanceof Error){
      setMessage();
    }
    setTimeout(() =>{
      setMessage('');
    },40000)
  }

}
useEffect(()=>{
  const getData =async () =>{
    const result = await diaryService.getDiaries();
    setDiaries(result);
  }
  getData();
},[]);
return(<div>
  <Notification message ={message}/>
  <Header text = 'Add new entry' />
  <AddForm addNew = {addNew} />
<Header text ='Diary entries'/>
<Content diaries={diaries} />

</div>)


};
export default App;