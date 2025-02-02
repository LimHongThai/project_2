const e1 = require('express');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const StuModel = require('./student_schema.js');

// PUT: /update/:id
app.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, pass } = req.body;
  
      // Find student by id
      const student = await StuModel.findOne({ id });
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }
  
      // Update fields if provided
      if (name) student.name = name;
      if (email) student.email = email;
      if (pass) student.pass = pass;
  
      await student.save();
  
      return res.status(200).json({ message: 'Student profile updated.', data: student });
    } catch (error) {
      console.error('Update Error:', error);
      return res.status(500).json({ error: 'Server error during profile update.' });
    }
  });

  // START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(6000, () => console.log('EXPRESS Server Started at Port No: 6000'));