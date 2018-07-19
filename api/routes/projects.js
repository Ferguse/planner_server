const express = require('express');
const router = express.Router();
const ctrStaff = require('../controllers/project');

router.get('/', ctrStaff.getProject);
router.post('/', ctrStaff.postProject);
router.put('/', ctrStaff.putProject);
router.delete('/', ctrStaff.deleteProject);

module.exports = router;
