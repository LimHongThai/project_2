const e1 = require('express');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const StuModel = require('./student_schema.js');

/*
In the postman use the following URL

{
  "id":1,
  "name":"Thai",
  "email":"Thai@gmail.com",
  "password":"abc"
}

*/

//REG API
app.post('/reg', (req, res) => {
  
  const STUobj = new StuModel({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    pass: req.body.password,
  });//CLOSE 
  
  //INSERT/SAVE THE RECORD/DOCUMENT
  STUobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERTED IN MONGODB DATABASE');
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD

// START THE EXPRESS SERVER. 5000 is the PORT NUMBER
app.listen(6000, () => console.log('EXPRESS Server Started at Port No: 6000'));
