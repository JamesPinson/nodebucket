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

        //If there is a mongodb error then it displays the error message.
          if (err)
          {
            console.log(err);
            res.status(501).send({
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
  //If a server error occurs we send this message.
  catch (e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})

//This is the find all task API.
router.get('/:empId/tasks', async(req, res) => {
  try
  {
    //This is the call to find the employee and show the id, todo array, and done array.
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
      if (err)
      {
        //This is the error logging.
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB exception ' + err.message
        })
      }
      else
      {
        //If no errors then it will return the employee record with the designated fields.
        console.log(employee);
        res.json(employee);
      }
    })
  }
  catch(e)
  {
    //This is the error logging for a server error.
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})

//This is the create task API.
router.post('/:empId/tasks', async(req, res) => {
  try
  {
    //This finds the employee by the emp id.
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err)
      {
        //This is the error handling for database errors.
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception: ' + err.message
        })
      }
      else
      {
        //Once we retrieve the employee we then can add a new task.
        console.log(employee);

        //This creates our new task variable.
        const newTask = {
          text: req.body.text
        };

        //This pushes the new task to our employee record.
        employee.todo.push(newTask);

        //This saves the new task and creates and updated employee record.
        employee.save(function(err, updatedEmployee) {
          if (err)
          {
            //This is error handling for any database errors.
            console.log(err);
            res.status(501).send({
              'message': 'MongoDB Exception: ' + err.message
            })
          }
          else
          {
            //This returns our updated employee record which includes the new task.
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        })
      }
    })
  }
  catch (e)
  {
    //This is error handling for our server.
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})

//Here we export the module.
module.exports = router;
