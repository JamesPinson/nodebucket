/**
 * Title: employee-api.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 21 August 2021
 * Description: This is the employee-api.js file.
 */

//This is the require statements.
const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

//This adds the employee id to the end of the route.
router.get('/:empId', async (req, res) => {

  //This is our try catch statement.
  try
  {
      //This creates our find EmpById function.
      Employee.findOne({'empId': req.params.empId}, function(err, employee) {

        //If the employee is not found then we return the error message.
          if (err)
          {
            console.log(err);
            res.status(500).send({
              'message': 'MongoDB server error: ' + err.message
            })
          }
          //If the employee Id is found then we return the employee data.
          else
          {
            console.log(employee);
            res.json(employee);
          }
      })

  }
  //If an error occurs we send this message.
  catch (e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})

//Here we export the module.
module.exports = router;
