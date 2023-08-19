const { log } = require('console');
const db = require('../config/dbConfig')
const fs = require('fs');
const path = require('path');

const TaskPage = async (req, res, next) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Alltasks ORDER By date ASC , time ASC');
        return res.status(200).json({ data: rows})
    } catch (error) {
        return next(error);
    }
};


const AddTask = async (req, res, next) => {
    try {
        console.log(req.body)
        const filename = req?.file?.filename;
        if(!filename){
            res.status(400).json({message:"Invalid image type"})
        }
        const { headings, descriptions, date, time, priority } = req.body;
        console.log(headings, descriptions, time, date, priority, filename);
        const query = 'INSERT INTO Alltasks (headings, descriptions, image, date, time, priority) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [headings, descriptions, filename, date, time, priority];
        const [result] = await db.execute(query, values);
        console.log('Task added to the database:', result);
        return res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        return next(error);
    }
};


const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const query = 'DELETE FROM Alltasks WHERE task_id = ?';
        const [image] = await db.execute('SELECT image FROM Alltasks WHERE task_id = ?', [id]);
        const [result] = await db.execute(query, [id]);
        console.log(result);
        if (result.affectedRows === 1) {
            const dir = 'C:/Users/rajes/Desktop/interval/backend/public/uploads'
            const filePath = path.join(dir, image[0].image);
            fs.unlinkSync(filePath);
            return res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const updateTask = async (req, res) => {
    try {
        console.log(req.body)
        const { headings, descriptions, image, date, time, priority, task_id } = req.body;
        const filename = req?.file?.filename ?? image
        const query = `UPDATE Alltasks 
                       SET headings = ?, descriptions = ?, image = ?, date = ?, time = ?, priority = ?
                       WHERE task_id = ?`;
        const [result] = await db.execute(query, [headings, descriptions, filename, date, time, priority, task_id]);
        if (result.affectedRows === 1) {
            return res.status(200).json({ message: 'Task updated successfully' });
        } else {
            return res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {
    TaskPage,
    AddTask,
    deleteTask,
    updateTask,
}