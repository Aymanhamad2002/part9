import axios from 'axios';
import { Diary, newDiary } from '../types';

const baseUrl:string = 'http://localhost:3000/api/diaries';

const getDiaries = async () :  Promise<Diary []>=>{
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
};
const createDirary = async (newItem:newDiary)=>{
 const response = await axios.post<Diary>(baseUrl,newItem);
 return response.data
    
}
export default {getDiaries,createDirary};