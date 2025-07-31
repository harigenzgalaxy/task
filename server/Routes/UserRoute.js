import express from "express"
const router = express.Router();

const {
  getSomedata,
  getdatabyid
} = require('../Controllers/UserController');

router.get('/', getSomedata);
router.get('/:id', getdatabyid);

module.exports = router;
