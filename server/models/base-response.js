/**
 * Title: base-response.js
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 1 September 2021
 * Description: This is the base-response file. This sets up the base response for our API's.
 */

//We add the base response class consisting of code, message, and data.
class BaseResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data
  }

  //Here we create the toObject function which will return the code, our message, the data, and the timestamp.
  toObject() {
    return{
      'code': this.code,
      'msg': this.msg,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

//This exports this file to the rest of our application.
module.exports = BaseResponse;
