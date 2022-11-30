const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(thoughtData => res.json(thoughtData))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },

  // Get single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create Thought
  createThought({params, body}, res) {
    Thought.create(body)
    .then(({_id}) => {
        return User.findOneAndUpdate(
          { _id: params.userId}, 
          {$push: {thoughts: _id}}, 
          {new: true}
        );
    })
    .then(thoughtData => {
        if(!thoughtData) {
            res.status(404).json({message: 'No user with this particular ID!'});
            return;
        }
        res.json(thoughtData)
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },

  // Update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a thought by its _id
  removeThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({
              message: 'No thoughts with this ID',
            })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Create a reaction stored in a single Thought's reactions
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Pull and remove a reaction by the reaction's reactionId
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  }
};

module.exports = thoughtController;
