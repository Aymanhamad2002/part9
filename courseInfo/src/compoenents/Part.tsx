import { CoursePart } from "../types";
const assertNever = (value:never) :never =>{
    throw new Error(`Unhandled discriminated union member ${JSON.stringify(value)}`)
}

const Part = ({coursepart} : {coursepart : CoursePart}) => {
    switch(coursepart.kind){
        case 'basic':
            return (<div>
                <h2>{coursepart.name}  {coursepart.exerciseCount}</h2>
                <p>{coursepart.description}</p>
            </div>)
        case 'background':
            return (<div>
                <h2>{coursepart.name}  {coursepart.exerciseCount}</h2>
                <p>{coursepart.description}</p>
                <p>{coursepart.backgroundMaterial}</p>
            </div>)
        case 'group':
            return (<div>
                <h2>{coursepart.name}  {coursepart.exerciseCount}</h2>
                <p>project exercies {coursepart.groupProjectCount}</p>
                
            </div>)
        case 'special':
            return (<div>
                <h2>{coursepart.name}  {coursepart.exerciseCount}</h2>
                <p>{coursepart.description}</p>
                <p>required skills: {coursepart.requirements.join(",")}</p>
            </div>) 
        
        default :
            return assertNever(coursepart);


    }

}
export default Part