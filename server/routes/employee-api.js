/**
 * Title: employee-api.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 1 September 2021
 * Description: This is the employee-api.js file. This contains all of our API's for our employee collection.
 */

//This is the require statements.
const express = require('express');
const Employee = require('../models/employee');
const BaseResponse = require('../models/base-response');
const { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } = require('@angular/platform-browser');

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

//This creates our put API to update our todo and done list for our drag and drop feature.
router.put('/:empId/tasks', async(req, res) => {
  try
  {
    //This uses the findOne function to find the employee by employee id.
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      //If there is an error then we return the error message, using our base response model.
      if (err)
      {
        console.log(err);
        const updateTaskMongoErrorResponse = new BaseResponse('501', 'Mongo Server error', err);
        res.status(501).send(updateTaskMongoErrorResponse.toObject());
      }
      else
      {
        //If it is successful then we return the employee included the todo and done list.
        console.log(employee);


        employee.set({
          todo: req.body.todo,
          done: req.body.done
        })

        //This saves any updates to the employee record.
        employee.save(function(err, updatedEmployee) {

          //If there is an error we return the Mongo error message using our base response model.
          if (err)
          {
            console.log(err);
            const updateTaskMongoOnSaveErrorResponse = new BaseResponse('501', 'Mongo server error', err);
            res.status(501).send(updateTaskMongoOnSaveErrorResponse.toObject());
          }

          //If it is successful then we return the updated employee collection which consist of our updated todo and done list.
          else
          {
            console.log(updatedEmployee);
            const updatedTaskSuccessResponse = new BaseResponse('200', 'Update successful', updatedEmployee);
            res.status(200).send(updatedTaskSuccessResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    //This is our server error handling which returns the error using our base response model.
    console.log(e);
    const updateTaskServerErrorResponse = new BaseResponse('500', 'Internal Server error', e);
    res.status(500).send(updateTaskServerErrorResponse.toObject());
  }

})

//This is the deleteTask API which we will use to allow users to delete task.
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try
  {
    //We start by finding the employee using the findOne function.
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      //If there is a Mongo Error we return the error message using our base response model.
      if (err) {
        console.log(err);
        const deleteTaskMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      }

      //If successful we return our employee and the item list.
      else{
        console.log(employee);

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        //This sets up for if the task is under the todo item list.
        if (todoItem) {

          //This will remove the item.
          employee.todo.id(todoItem._id).remove();

          //This will save the new updated employee item list.
          employee.save(function(err, updatedTodoItemEmployee) {

            //If there is a Mongo error then we return the error message using our base response model.
            if (err) {
              console.log(err);
              const deleteTodoItemMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
              res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());
            }
            //If it is successful then we return the updated employee collection with the item removed.
            else {
              console.log(updatedTodoItemEmployee);
              const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Item removed from the todo array', updatedTodoItemEmployee);
              res.status(200).send(deleteTodoItemSuccessResponse.toObject());
            }
          })

          //This is for if the item is in the done item list.
        } else if (doneItem) {

          //This removes the task item from the list.
          employee.done.id(doneItem._id).remove();

          //This saves the updated list under the employee collection.
          employee.save(function(err, updateDoneItemEmployee) {

            //If there is a mongo error we return this error message using our base response model.
            if (err) {
              console.log(err);
              const deleteDoneItemMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
              res.status(501).send(deleteDoneItemMongoErrorResponse.toObject());
            }
            //If it is successful the we return the updated list with the item removed.
            else {
              console.log(updateDoneItemEmployee);
              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Item removed from the done array', updateDoneItemEmployee);
              res.status(200).send(deleteDoneItemSuccessResponse.toObject());
            }
          })

          //If the task id is invalid this we return this error message using our base response model.
        } else {
          console.log('Invalid taskId: ' + req.params.taskId);
          const deleteTaskNotFoundResponse = new BaseResponse('300', 'Unable to locate the requested source', req.params.taskId);
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    })
  }

  //If we have a server error then we return this error message using our base response model.
  catch (e)
  {
    console.log(e);

    const deleteTaskServerError = new BaseResponse('500', 'Internal Server error', e);

    res.status(500).send(deleteTaskServerError.toObject());
  }
})
//Here we export the module.
module.exports = router;
