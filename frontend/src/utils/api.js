import { Axios } from "./axios";
import errorHandler from "./errorHandler";

export const createTask = errorHandler((data) => {
    console.log(data);
    return Axios.post('/addTask', data)
})

export const getTasks = errorHandler(async () => {
    const res = await Axios.get('/viewTask');
    return res;
})
export const deleteTasks = errorHandler((data) => {
   return Axios.delete(`/deleteTask/${data}`);
})

export const editTask = errorHandler((data)=>{
    console.log(data);
    return Axios.post("/editTask",data)
})