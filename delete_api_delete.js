const e1 = require('express');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const StuModel = require('./student_schema.js');

// DELETE: /delete/:id
app.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedStudent = await StuModel.findOneAndDelete({ id });
      if (!deletedStudent) {
        return res.status(404).json({ error: 'Student not found or already deleted.' });
      }
  
      return res.status(200).json({ message: 'Student deleted successfully.', data: deletedStudent });
    } catch (error) {
      console.error('Delete Error:', error);
      return res.status(500).json({ error: 'Server error during delete operation.' });
    }
  });

  // START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(6000, () => console.log('EXPRESS Server Started at Port No: 6000'));