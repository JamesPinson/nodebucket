/**
 * Title: employee.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 21 August 2021
 * Description: This is the employee.js file.
 */

//This is our require statements.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemDocument = require('./item');

//This is where we create our employeeSchema with the fields.
let employeeSchema = new Schema({
  empId:      { type: String, unique: true},
  firstName:  { type: String },
  lastName:   { type: String },
  todo: [ItemDocument],
  done: [ItemDocument]
}, {collection: 'employees'})

//Here we export the module.
module.exports = mongoose.model('Employee', employeeSchema);
