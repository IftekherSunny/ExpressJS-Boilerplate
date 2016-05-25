const express         = require('express');
const router          = express.Router();
const UserController  = require('./../controllers/UserController');


/* Users route */
router.get('/', UserController.getIndex);



module.exports = router;
