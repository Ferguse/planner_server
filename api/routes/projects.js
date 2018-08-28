const express = require('express');
const router = express.Router();
const ctrProject = require('../controllers/project');

router.get('/', ctrProject.getProjects);
router.post('/', ctrProject.postProject);
router.put('/', ctrProject.putProject);
router.delete('/', ctrProject.deleteProject);

module.exports = router;
