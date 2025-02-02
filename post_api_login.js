const e1 = require('express');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const StuModel = require('./student_schema.js');

// POST: /login
app.post('/login', async (req, res) => {
    try {
      const { id, pass } = req.body;
  
      if (!id || !pass) {
        return res.status(400).json({ error: 'SID and password are required.' });
      }
  
      // Find the student by sid
      const student = await StuModel.findOne({ id });
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }
  
      // Simple password check (plaintext for example purposes)
      if (student.pass !== pass) {
        return res.status(401).json({ error: 'Invalid password.' });
      }
  
      // Login success
      return res.status(200).json({ message: 'Login successful.', data: student });
    } catch (error) {
      console.error('Login Error:', error);
      return res.status(500).json({ error: 'Server error during login.' });
    }
  });

// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(6000, () => console.log('EXPRESS Server Started at Port No: 6000'));
