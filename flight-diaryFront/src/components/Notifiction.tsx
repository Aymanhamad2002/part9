const Notification = ({message} :{message:string}) =>{
    if(!message){
        return null;
    }
    else{
        return <div><h3>{message}</h3></div>
    }
}
export default Notification;