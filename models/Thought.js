const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
  }
);

// virtual
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
// Make model of Thought
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
