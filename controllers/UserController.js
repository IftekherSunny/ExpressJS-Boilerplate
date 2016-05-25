'use strict'

const User = require('./../models/User');


class UserController
{
  /**
   * Users view page.
   */
  getIndex(req, res, next) {
     res.send('Users view page');
  }
}



module.exports = new UserController;
