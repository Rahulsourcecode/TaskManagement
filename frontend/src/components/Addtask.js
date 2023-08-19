import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { createTask, editTask } from '../utils/api';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import EditIcon from '@mui/icons-material/Edit';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import { formatDate } from '../utils/date';

const AddTask = ({ reset, isOpen }) => {
    console.log(isOpen);
    const [open, setOpen] = useState(false);
    const initialState = {
        headings: '',
        descriptions: '',
        image: '',
        date: Date.now(),
        time: '12:00:00',
        priority: ''
    }
    const [taskData, setTaskData] = useState(isOpen ?? initialState);
    console.log(taskData)
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        validateForm(); // Call validateForm when the form data changes
    }, [taskData]); // Run the effect whenever taskData changes

    const fileInputRef = React.useRef(null);
    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setTaskData({ ...taskData, image: file });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePriorityChange = (e) => {
        setTaskData((prevData) => ({
            ...prevData,
            priority: e.target.value,
        }));
    };

    const handleSubmit = () => {
        const formData = new FormData();
        for (const key in taskData) {
            if (taskData.hasOwnProperty(key) && key !== "image" && key !== "date") {
                formData.append(key, taskData[key]);
            }
        }
        formData.append('date', formatDate(taskData.date))
        typeof (taskData.image) === 'object' ? formData.append("image", taskData.image, taskData?.image?.name) : formData.append("image", taskData.image)
        isOpen ? editTask(formData) : createTask(formData).then(()=>setTaskData(initialState))
        setOpen(false);
        reset((prev) => !prev)
    };

    const validateForm = () => {
        const { headings, descriptions, image, date, time, priority } = taskData;
        if (headings && descriptions && image && date && time && priority) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    };

    return (
        <>
            {!isOpen ? <Button sx={{ marginTop: 2 }} variant='contained' onClick={() => setOpen(true)}>
                Add items
            </Button> :
                <IconButton onClick={() => setOpen(true)}>
                    <EditIcon />
            </IconButton>}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add Task</DialogTitle>
                <DialogContent>
                    <TextField
                        label='Heading'
                        name='headings'
                        value={taskData.headings}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                        required
                    />
                    <TextField
                        label='Description'
                        name='descriptions'
                        value={taskData.descriptions}
                        onChange={handleInputChange}
                        fullWidth
                        margin='normal'
                        multiline
                        required
                    />
                    <Box
                        sx={{
                            width: 150,
                            height: 100,
                            cursor: "pointer",
                            backgroundColor: "#F0F0F0", // Light gray background
                            border: "1px dashed #A9A9A9", // Dotted border
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                        onClick={handleFileSelect}
                    >
                        {taskData.image ? (
                            <img
                                style={{ width: 150, height: 100, padding: 12, objectFit: "cover" }}
                                src={typeof (taskData.image) === 'object' ? URL.createObjectURL(taskData.image) : `http://localhost:3001/uploads/${taskData.image}`}
                                alt="Thumbnail"
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
                            required
                        />
                    </Box>
                    <div style={{ marginTop: 16 }}>
                        <label>Date:</label>
                        <DatePicker
                            selected={new Date(taskData.date)}
                            onChange={(date) =>
                                setTaskData((prevData) => ({
                                    ...prevData,
                                    date,
                                }))
                            }
                            dateFormat="MM/dd/yyyy"
                            className="form-control"
                            required
                        />
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <label>Time:</label>
                        <TextField
                            type="time"
                            value={taskData.time}
                            onChange={(e) =>
                                setTaskData((prevData) => ({
                                    ...prevData,
                                    time: e.target.value,
                                }))
                            }
                            fullWidth
                            inputProps={{
                                step: 300, // 5 minute intervals
                            }}
                        />
                    </div>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={taskData.priority}
                            onChange={handlePriorityChange}
                            name="priority"
                        >
                            <MenuItem value="1">High</MenuItem>
                            <MenuItem value="2">Medium</MenuItem>
                            <MenuItem value="3">Low</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!formValid}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddTask;