/*
Code Att
*/

const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

//This adds the employee id to the end of the route.
router.get('/:empId', async (req, res) => {

  //Comments here
  try
  {
      //Comments
      Employee.findOne({'empId': req.params.empId}, function(err, employee) {

        //Comments
          if (err)
          {
            console.log(err);
            res.status(500).send({
              'message': 'MongoDB server error: ' + err.message
            })
          }
          //Comments
          else
          {
            console.log(employee);
            res.json(employee);
          }
      })

  }
  //Comments
  catch (e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})


module.exports = router;
