const express = require('express');
const router = express.Router();
const ctrUser = require('../controllers/user');

router.get('/', ctrUser.getUsers);
router.post('/', ctrUser.postUser);
router.put('/', ctrUser.putUser);
router.delete('/', ctrUser.deleteUser);

module.exports = router;
