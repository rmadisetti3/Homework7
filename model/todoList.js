const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const todoListSchema = new Schema({
  content: {
    type: String,
    unique: true,
    required: "You must include something"
  },
  isChecked: {
    type: Boolean
  }
});

var todoList = mongoose.model('todoList', todoListSchema);

module.exports = todoList;
