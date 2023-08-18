import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { getTasks, deleteTask } from '../utils/api'; // Replace with your API functions

export default function ListTask({ onTaskClick }) {
    const [tasks, setTasks] = React.useState([]);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    React.useEffect(() => {
        getTasks().then((res) => setTasks(res.data));
    }, []);

    const handleOpenDeleteDialog = (task) => {
        setSelectedTask(task);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedTask(null);
    };

    const handleDeleteTask = async () => {
        if (selectedTask) {
            try {
                // await deleteTask(selectedTask.id); // Replace with your API delete function
                const updatedTasks = tasks.filter(task => task.id !== selectedTask.id);
                setTasks(updatedTasks);
            } catch (error) {
                // Handle error
            } finally {
                handleCloseDeleteDialog();
            }
        }
    };

    return (
        <Grid sx={{ width: '100%' }}>
            <Typography sx={{ marginTop: 2, marginBottom: 2 }}>List of tasks</Typography>
            <List sx={{ width: '100%', maxWidth: 360, maxHeight: '70vh', overflowY: "auto", bgcolor: 'background.paper' }}>
                {tasks.length ?
                    tasks.map((task, index) => (
                        <ListItem
                            key={index}
                            alignItems="flex-start"
                            button
                            onClick={() => onTaskClick(task)}
                        >
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={`http://localhost:3001/uploads/${task.image}`} />
                            </ListItemAvatar>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <ListItemText
                                    primary={task.heading}
                                />
                                <Button color='primary'> <EditIcon /> </Button>
                                <Button onClick={() => handleOpenDeleteDialog(task)} color='warning'> <DeleteIcon /> </Button>
                            </Box>
                        </ListItem>
                    ))
                    : <Typography sx={{ marginLeft: 10 }}>no tasks added</Typography>}
            </List>
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteTask} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >
    );
}
