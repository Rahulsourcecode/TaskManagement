import React, { useState } from 'react';
import ListTask from './ListTask';
import DetailedTaskView from './DetailedTaskView';
import { Grid } from '@mui/material';
import { getTasks } from '../utils/api';

const ListMain = ({onReset,reset}) => {
    const [selectedTask, setSelectedTask] =  useState(null);
    const [tasks, setTasks] = React.useState([]);
    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };
    React.useEffect(() => {
        getTasks().then((res) =>{
             setTasks(res.data.data)
             setSelectedTask((prev)=>res.data.data.includes(prev) ? prev : null);
            }).catch((err)=>console.log(err.message))
    }, [onReset]);
    
    return (
        <Grid spacing={4} container sx={{ display: 'flex'}}>
            <Grid  item lg={3} md={12} xs={12}>
                <ListTask onTaskClick={handleTaskClick} task = {tasks} reset={reset} />
            </Grid>
            <Grid item lg={9}  md={12} xs={12}>
            <DetailedTaskView task={selectedTask} />
            </Grid>
        </Grid>
    );
};

export default ListMain;
