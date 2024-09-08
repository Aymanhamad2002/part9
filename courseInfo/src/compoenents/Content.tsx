import { CoursePart } from "../types";
import Part from "./Part";


const Content = ({courses}:{courses:CoursePart []}) =>{
    return(<div>
        {courses.map(c => {
            return(
                <Part coursepart={c} key ={c.name} />
             )})}
    </div>)
}
export default Content;