import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Box, Typography } from '@mui/material';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { createTask } from '../utils/api';
const Addtask = () => {
    const [open, setOpen] = useState(false);
    const [taskData, setTaskData] = useState({
        heading: '',
        description: '',
        image: '',
    });
    console.log(taskData);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fileInputRef = React.useRef(null);
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setTaskData({ ...taskData, image: file })

    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('heading', taskData.heading)
        formData.append('description', taskData.description)
        formData.append("image", taskData.image, taskData?.image?.name)
        createTask(formData)
        console.log(taskData);
        handleClose();
    };

    return (
        <Grid>
            <Button sx={{ marginTop: 2 }} variant='contained' onClick={handleOpen}>
                Add items
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Heading'
                        name='heading'
                        value={taskData.heading}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Description'
                        name='description'
                        value={taskData.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                        multiline
                    />
                    <Box
                        sx={{
                            width: 150,
                            height: 100,
                            cursor: "pointer",
                            backgroundColor: "#212121",
                            "&:hover": {
                                backgroundColor: "#424242",
                                opacity: [0.9, 0.8, 0.7],
                            },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                        onClick={handleFileSelect}
                    >
                        {taskData.image ? (
                            <img
                                style={{ width: 150, height: 100, padding: 22 }}
                                src={typeof (taskData.image) == 'object' ? URL.createObjectURL(taskData.image) : `http://localhost:5000/${taskData.image}`}
                            />
                        ) : (
                            <React.Fragment>
                                <AddAPhotoIcon />
                                <Typography sx={{ mt: 1, fontSize: 13 }}>
                                    Upload Thumbnail
                                </Typography>
                            </React.Fragment>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color='primary'>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default Addtask;
