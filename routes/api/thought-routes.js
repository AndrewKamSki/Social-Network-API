const router = require('express').Router();
const {
  // Exported functions from thought-controller
  createThought,
  getAllThoughts,
} = require('../../controllers/thought-controller');

// Use exported functions from line 3 to create routes
router.route('/').get(getAllThoughts);

router.route('/:userId').post(createThought);

module.exports = router;
