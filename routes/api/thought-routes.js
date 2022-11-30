const router = require('express').Router();
const {
  createThought,
  getAllThoughts,
  getSingleThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);

router.route('/:userId').post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;
