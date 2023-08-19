import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Menu, Checkbox } from '@mui/material';
import { deleteTasks } from '../utils/api'; // Replace with your API functions
import FilterListIcon from '@mui/icons-material/FilterList';
import AddTask from './Addtask';
export default function ListTask({ onTaskClick, task, reset }) {
    console.log(task);
    const [tasks, setTasks] = React.useState(null);
    const [selectedTask, setSelectedTask] = React.useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [filter, setFilter] = React.useState([0])
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    React.useEffect(() => {
        setTasks(task);
    }, [task]);
    const handleOpenDeleteDialog = (task) => {
        setSelectedTask(task);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedTask(null);
    };
    React.useEffect(() => {
        const newTask = filter[0] === 0 ? task : task.filter(obj => filter.includes(parseInt(obj.priority))).sort((a, b) => a.priority - b.priority);
        setTasks(newTask)
    }, [filter])
    const handleSelect = (value) => {
        if (!filter.includes(value)) {
            if (value === 0) {
                setFilter([0])
            } else {
                const sum = filter.reduce((acc, curr) => acc + curr)
                const newFilter = sum + value === 6 ? [0] : (sum + value === value ? [value] : [filter[0], value])
                setFilter(newFilter)
            }
        }
    }
    const handleDeleteTask = async () => {
        if (selectedTask) {
            try {
                deleteTasks(selectedTask.task_id).then(()=>reset(prev=>!prev))
            } catch (error) {
                // Handle error
            } finally {
                handleCloseDeleteDialog();
            }
        }
    };
    const setColor = (value) => filter.includes(value) ? 'lightblue' : '#fff'
    return (
        <Grid sx={{ width: '100%' }}>
            <Grid container sx={{ width: '100%', maxWidth: 360 }}>
                <Grid item lg={10} md={10} sm={10} xs={10}>
                    <Typography md={10} sx={{ marginTop: 2, marginBottom: 2 }}>List of tasks</Typography>
                </Grid>
                <IconButton onClick={handleOpen}><FilterListIcon /></IconButton>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleSelect(0)} sx={{ backgroundColor: () => setColor(0) }}>all</MenuItem>
                <MenuItem onClick={() => handleSelect(1)} sx={{ backgroundColor: () => setColor(1) }}>High</MenuItem>
                <MenuItem onClick={() => handleSelect(2)} sx={{ backgroundColor: () => setColor(2) }}>Medium</MenuItem>
                <MenuItem onClick={() => handleSelect(3)} sx={{ backgroundColor: () => setColor(3) }}>Low</MenuItem>
            </Menu>
            <List sx={{ width: '100%', maxWidth: 360, maxHeight: '70vh', overflowY: "auto", bgcolor: 'background.paper' }}>
                {tasks ?
                    tasks?.length ?
                        tasks.map((task, index) => (
                            <ListItem
                                key={task.task_id}
                                alignItems="flex-start"
                                button
                                onClick={() => onTaskClick(task)}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={`http://localhost:3001/uploads/${task.image}`} />
                                </ListItemAvatar>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <ListItemText
                                        primary={task.headings}
                                    />
                                    <AddTask isOpen={task} reset={reset} />
                                    <Button onClick={() => handleOpenDeleteDialog(task)} color='warning'> <DeleteIcon /> </Button>
                                </Box>
                            </ListItem>
                        )) : <Typography sx={{ marginLeft: 10 }}>no tasks added</Typography>
                    : <Typography sx={{ marginLeft: 10 }}>ghjg</Typography>}
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
            {/* {isOpen && <AddTask isOpen={isOpen} reset={reset} />} */}
        </Grid >
    );
}
