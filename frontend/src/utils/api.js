import { Axios } from "./axios";
import { errorHandler } from "./errorHandler";

export const createTask = errorHandler((data) => {
    Axios.post('/addTask', data)
})

export const getTasks = errorHandler(async () => {
    const res = await Axios.get('/viewTask');
    return res;
})