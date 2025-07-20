const express = require('express');
const router = express.Router();

const {
  getSomedata,
  getdatabyid
} = require('../controllers/UserController');

router.get('/', getSomedata);
router.get('/:id', getdatabyid);

module.exports = router;