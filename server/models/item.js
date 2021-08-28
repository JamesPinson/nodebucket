/**
 * Title: item.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 28 August 2021
 * Description: This is the item.js file.
 */

//This is our require statement for mongoose.
const mongoose = require('mongoose');

//Here we create the schema.
const Schema = mongoose.Schema;

//This is where we create our new item scheme which consist of one text field with a string value.
let itemSchema = new Schema ({
  text: { type: String }
});

//This exports the itemSchema to the rest of the application.
module.exports = itemSchema;
