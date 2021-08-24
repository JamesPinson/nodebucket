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

//Find all task api

router.get('/:empId/task', async(req, res) => {
  try
  {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
      if (err)
      {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB exception ' + err.message
        })
      }
      else
      {
        console.log(employee);
        res.json(employee);
      }
    })
  }
  catch(e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})

//Create Task
router.post('/:empId/tasks', async(req, res) => {
  try
  {
    Employee.findOne({'empId': reg.params.empId}, function(err, employee) {
      if (err)
      {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception: ' + err.message
        })
      }
      else
      {
        console.log(employee);

        const newTask = {
          text: req.body.test
        };

        employee.todo.push(newTask);
        employee.save(function(err, updatedEmployee) {
          if (err)
          {
            console.log(err);
            res.status(501).send({
              'message': 'MongoDB Exception: ' + err.message
            })
          }
          else
          {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        })
      }
    })
  }
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
