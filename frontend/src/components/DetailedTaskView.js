import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

const DetailedTaskView = ({ task}) => {
    return (
        <Grid sx={{ width: '100%' }}>
            {task ? (
                <Card sx={{ width: '100%', height: "400px", margin: 'auto', marginTop: 7 }}>
                    <CardMedia
                        sx={{ width: "100%", marginTop: 1 }}
                        component="img"
                        alt="Task Image"
                        height="200"
                        width='10'
                        image={`http://localhost:3001/uploads/${task.image}`} // Provide the image URL from the task
                    />
                    <CardContent>
                        <Typography variant="h6">Details of Selected Task:</Typography>
                        <Typography>Title: {task.headings}</Typography>
                        <Typography
                            sx={{
                                maxWidth: '100%', // Set the maximum width
                                overflow: 'hidden',
                                display: '-webkit-box',
                                '-webkit-box-orient': 'vertical',
                                '-webkit-line-clamp': 3, // Number of lines to show
                                textOverflow: 'ellipsis' // Handle text overflow with ellipsis
                            }}
                        >
                            Description: {task.descriptions}
                            <br />
                            time: {task.time}
                            <br />
                            date: {task.date}
                        </Typography>
                        {/* Render other details */}
                    </CardContent>
                </Card>
            ) : (
                <Typography sx={{ display: 'flex', justifyContent: 'center', }}>No task selected.</Typography>
            )}
        </Grid>
    );
};

export default DetailedTaskView;
