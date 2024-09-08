import { Diary } from "../types";
import DiaryEntry from "./DiaryEntry";

const Content = ({diaries} :{diaries:Diary[]}) =>{ 
    return(<div>
        {diaries.map(d =>{
            return(<DiaryEntry key ={d.id} diary={d} />)
        })}
    </div>)

}
export default Content