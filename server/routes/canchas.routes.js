const express = require('express');
const router = express.Router();
const canchasController = require('../controllers/canchas.controller');

router.get('/', canchasController.getAll);
router.get('/:id', canchasController.getById);
router.post('/', canchasController.create);
router.put('/:id', canchasController.update);
router.delete('/:id', canchasController.delete);

module.exports = router;