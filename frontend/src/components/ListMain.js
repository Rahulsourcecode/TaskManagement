import React, { useState } from 'react';
import ListTask from './ListTask';
import DetailedTaskView from './DetailedTaskView';
import { Grid } from '@mui/material';

const ListMain = () => {
    const [selectedTask, setSelectedTask] =  useState(null);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    return (
        <Grid spacing={4} container sx={{ display: 'flex'}}>
            <Grid  item lg={3} md={12} xs={12}>
                <ListTask onTaskClick={handleTaskClick} />
            </Grid>
            <Grid item lg={9}  md={12} xs={12}>
            <DetailedTaskView task={selectedTask} />
            </Grid>
        </Grid>
    );
};

export default ListMain;
