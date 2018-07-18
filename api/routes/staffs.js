const express = require('express');
const router = express.Router();
const ctrStaff = require('../controllers/staff');

router.get('/', ctrStaff.getStaffs);
router.post('/', ctrStaff.postStaff);
router.put('/', ctrStaff.putStaff);
router.delete('/', ctrStaff.deleteStaff);

module.exports = router;
