const router = require('express').Router();
const {
  // Exported functions from user controller
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

// Use exported functions from line 3 to create routes
router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);


module.exports = router;
