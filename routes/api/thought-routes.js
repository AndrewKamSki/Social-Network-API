const router = require('express').Router();
const {
  // Exported functions from thought-controller
  createThought,
  getAllThoughts,
  getSingleThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// Use exported functions from line 3 to create routes
router.route('/').get(getAllThoughts);

router.route('/:userId').post(createThought);

router.route('/:id').get(getSingleThought).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;
