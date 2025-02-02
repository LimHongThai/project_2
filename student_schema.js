const schema_mongoose = require('mongoose');

const StudentSchema = schema_mongoose.Schema(
  {
    id: {type: Number},
    name: { type: String },
    email: { type: String },
    pass: { type: String }
 }, 
 {
    timestamps: true
 }
 );

module.exports = schema_mongoose.model('student_collection', StudentSchema);