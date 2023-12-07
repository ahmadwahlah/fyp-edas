const express = require("express");
const router = express.Router();
const DynamicForm = require("../models/DynamicForm.js");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.js");
const Student = require("../models/Student.js");
const Faculty = require("../models/Faculty.js");


let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdullah.mohammad2019274@gmail.com",
    pass: "ewoesymbrpbypxep",
  },
});

//-------------- these will be created by admin------------------
// @route   GET api/dynamicforms
// @desc    Get all the dynamicforms
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const forms = await DynamicForm.find({}).sort({ date: -1 });
    res.json(forms);
  } catch (error) {
    if (error) console.log(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/dynamicforms/student
// @desc    Get all the dynamicforms with student visibility
// @access  Private

router.get("/student", auth, async (req, res) => {
  try {
    const forms = await DynamicForm.find({ studentVisibility: true }).sort({
      date: -1,
    });
    res.json(forms);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/dynamicforms/faculty
// @desc    Get all the dynamicforms with faculty visibility
// @access  Private

router.get("/faculty", auth, async (req, res) => {
  try {
    const forms = await DynamicForm.find({ facultyVisibility: true }).sort({
      date: -1,
    });
    res.json(forms);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// @route   GET api/dynamicforms/student/:id
// @desc    Get dynamicforms with student visibility
// @access  Private

router.get("/student/:id", auth, async (req, res) => {
  try {
    const forms = await DynamicForm.find({studentVisibility: true, _id: req.params.id,}).sort({ date: -1 });
    res.json(forms);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/dynamicforms/faculty/:id
// @desc    Get dynamicforms with faculty visibility
// @access  Private

router.get("/faculty/:id", auth, async (req, res) => {
  try {
    const forms = await DynamicForm.find({facultyVisibility: true, _id: req.params.id,}).sort({ date: -1 });
    res.json(forms);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// @route   GET api/dynamicforms/:id
// @desc    Get dynamicforms by id
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const form = await DynamicForm.find({_id: req.params.id});
    res.json(form);
  } catch (error) {
    if (error) console.log(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// @route   DELETE api/dynamicforms/:id
// @desc    delete dynamicforms by id
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const form = await DynamicForm.findOne({ _id: req.params.id });
    if (!form) {
      return res.status(404).json({ msg: "DynamicForm not found" });
    }

    await form.deleteOne();
    res.json({ msg: "DynamicForm deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// @route   POST api/dynamicforms ----- applied at client side
// @desc    Add new form
// @access  Private

router.post(
  "/",
  [
    auth,
    [
      check("formName", "Form Name is required").not().isEmpty(),
      check("fields", "Fields are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }
      const {
        formName,
        fields,
        undertaking,
        approvalHierarchy,
        facultyVisibility,
        studentVisibility,
      } = req.body;
      const newForm = new DynamicForm({
        formName,
        fields,
        undertaking,
        approvalHierarchy,
        facultyVisibility,
        studentVisibility,
      });
      const dynamicform = await newForm.save();

      // Send email notifications to relevant recipients
      const recipients = [];

      if (studentVisibility) {
        const students = await Student.find();
        recipients.push(...students.map((student) => student.email));
      }

      if (facultyVisibility) {
        const faculties = await Faculty.find();
        recipients.push(...faculties.map((faculty) => faculty.email));
      }

      if (recipients.length > 0) {
        const mailOptions = {
          from: "abdullah.mohammad2019274@gmail.com",
          to: recipients,
          subject: `New Form: ${formName}`,
          text: `A new '${formName}' is now available on the EDAS platform. Log in to access it.`,
          html: `
            <div style="font-family: Arial, sans-serif;">
              <p style="font-size: 14px; color: #333;">A new <strong>${formName}</strong> is now available on the EDAS platform. Log in to access it.</p>
            </div>
          `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      }

      res.json(dynamicform);
    } catch (error) {
      if (error) console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  }
);


// @route   PUT api/dynamicforms/:id
// @desc    Update data into form collection.
// @access  Private

router.put("/:id", async (req, res) => {
  const { formName, fields, undertaking } = req.body;

  const dynamicFormFields = {};
  if (formName) dynamicFormFields.formName = formName;
  if (fields) dynamicFormFields.fields = fields;
  if (undertaking) dynamicFormFields.undertaking = undertaking;

  try {
    let dynamicform = await DynamicForm.findById(req.params.id);
    if (!dynamicform) return res.status(404).json({ msg: "Form not found" });

    dynamicform = await DynamicForm.findByIdAndUpdate(
      req.params.id,
      { $set: dynamicFormFields },
      { new: true }
    );

    res.json(dynamicform);
  } catch (error) {
    if (error) console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   DELETE api/dynamicforms/:id
// @desc    Delete a form
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const form = await DynamicForm.findById(req.params.id);
    if (!form) return res.status(404).json({ msg: "Form not found" });
    await DynamicForm.findByIdAndRemove(req.params.id);
    res.json({ msg: "Form removed" });
  } catch (error) {
    if (error) console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

module.exports = router;
