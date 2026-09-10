const express = require('express');
const router = express.Router();

const { getAll, getById, create, update, remove } = require('../controllers/expenseController');
const { expenseValidationRules, validate } = require('../middleware/validate');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', expenseValidationRules, validate, create);
router.put('/:id', expenseValidationRules, validate, update);
router.delete('/:id', remove);

module.exports = router;
