const mongoose = require("mongoose");

const FieldSchema = mongoose.Schema({
  id:{
    type: String,
    required: true,
  },
  heading:{
    type: String,
  },
  name: {
    type: String,
  },
  type: {
    type: String,
  }, 
  placeholder: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  options: {
    type: [mongoose.Schema.Types.Mixed],
  },
  allowBeforeToday: {
    type: Boolean,
  },
  clockFormat: {
    type: String,
  },
  rows: {
    type: Number,
  }
});

const DynamicFormSchema = mongoose.Schema({
  formName: {
    type: String,
    required: true,
  },
  studentVisibility: {
    type: Boolean,
    default: false
  },
  facultyVisibility: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
  fields:{ 
    type:[FieldSchema],
    required: true,
  },
  undertaking: {
    type: [
      {
        type: String,
      },
    ],
    default: [
      "If anyone provides false/incorrect information, disciplinary action will be taken against the said person.",
    ],
  },
  approvalHierarchy: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("DynamicForm", DynamicFormSchema);
