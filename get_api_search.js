const e1 = require('express');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const StuModel = require('./student_schema.js');

// GET: /search/:sid
app.get('/search/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const student = await StuModel.findOne({ id });
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }
  
      return res.status(200).json({ data: student });
    } catch (error) {
      console.error('Search Error:', error);
      return res.status(500).json({ error: 'Server error during student search.' });
    }
  });

  // START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(6000, () => console.log('EXPRESS Server Started at Port No: 6000'));