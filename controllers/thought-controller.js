const { Thought, User } = require('../models');

const thoughtController = {
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
    .then(dbThoughtData => {
        if(!dbThoughtData) {
            res.status(404).json({message: 'No thought with this particular ID!'});
            return;
        }
        res.json(dbThoughtData)
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },

  // Get all thoughts
  getAllThoughts(req,res) {
    Thought.find()
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
};

module.exports = thoughtController;
