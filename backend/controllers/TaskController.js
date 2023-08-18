const db = require('../config/dbConfig')

const TaskPage = async (req, res, next) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Alltasks');
        console.log('Data received from Db:');
        console.log(rows)
        res.status(200).send(rows).json({ message: 'success' })
    } catch (error) {
        return next(error);
    }
};


const AddTask = async (req, res, next) => {
    try {
        const filename = req.file.filename;
        const { heading, description } = req.body;
        console.log(heading, description);
        const query = 'INSERT INTO Alltasks (heading, description, image) VALUES (?, ?, ?)';
        const values = [heading, description, filename];
        const [result] = await db.execute(query, values);
        console.log('Task added to the database:', result);
        res.status(201).json({ message: 'Task added successfully' });
    } catch (error) {
        return next(error);
    }
};







module.exports = {
    TaskPage,
    AddTask,
}