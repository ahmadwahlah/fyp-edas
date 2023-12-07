const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApproverSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  disapproved:{
    type: Boolean,
    default: false,
  }, 
  comment: {
    type: String,
  },
});

const FormSubmissionSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  faculty:{
    type: Schema.Types.ObjectId,
    ref: "faculty",
  },
  formName: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  department: {
    type: String,
  },
  responces: {
    type: Object,
    required: true
  },
  approvers: {
    type: [ApproverSchema],
    required: true,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

FormSubmissionSchema.statics.createApprovers = function (approvalHierarchy) {
  if (!Array.isArray(approvalHierarchy)) {
    approvalHierarchy = [];
  }
  
  return approvalHierarchy.map((role, index) => ({
    role: role,
    order: index + 1,
    approved: false,
    disapproved:false,
    comment: "",
  }));
};

module.exports = mongoose.model("Form", FormSubmissionSchema);

