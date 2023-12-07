const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const Student = require("../models/Student.js");
const Faculty = require("../models/Faculty.js");
const auth = require("../middleware/auth.js");
const Form = require("../models/Form.js");

// Create reusable transporter object using the default SMTP transport for nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdullah.mohammad2019274@gmail.com",
    pass: "ewoesymbrpbypxep",
  },
});

// @route   POST api/student
// @desc    Register a student
// @access  Public

router.post(
  "/",
  [
    // Validations
    check("firstname", "Please enter your firstname").not().isEmpty(),
    check("lastname", "Please enter your lastname").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
    check("phoneNumber", "Please enter a valid phone number").isLength({
      min: 11,
    }),
    check("regnum", "Please enter a valid registration number").isLength({
      min: 7,
    }),
    check("faculty", "Please enter your faculty").not().isEmpty(),
    check("batch", "Please enter your batch").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      firstname,
      lastname,
      email,
      password,
      phoneNumber,
      regnum,
      faculty,
      role,
      batch,
    } = req.body;
    try {
      let student = await Student.findOne({ email });
      if (student) {
        return res.status(400).json({ msg: "Email already registered by student or faculty." });
      }
      let foundFaculty = await Faculty.findOne({ email });
      if (foundFaculty) {
        return res.status(400).json({ msg: "Email already registered by student or faculty." });
      }

      student = new Student({
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        regnum,
        faculty,
        role,
        batch,
      });

      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);
      await student.save();
      const payload = {
        student: {
          id: student.id,
        },
      };

      // send email to student
      let mailOptions = {
        from: "abdullah.mohammad2019274@gmail.com",
        to: email,
        subject: `Welcome to EDAS, ${firstname} ${lastname}`,
        text: `Dear ${firstname} ${lastname},
      
             We are delighted to welcome you to the EDAS platform at GIKI. We have received your registration request and will verify your information. You will receive another email once your account is approved by the administrator.
             
             If you encounter any issues or have any questions, please do not hesitate to contact our support team.
             
             We look forward to your active participation in our academic community.
             
             Best regards,
             The EDAS Team
             `,
               html: `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
               <h1 style="font-size: 18px; color: #333;">Dear ${firstname} ${lastname},</h1>
               <h2 style="font-size: 16px; color: #333;">Welcome to the EDAS Platform at GIKI</h2>
               <p style="font-size: 14px; color: #666; line-height: 1.5;">We are delighted to welcome you to the EDAS platform at GIKI. We have received your registration request and will verify your information. You will receive another email once your account is approved by the administrator.</p>
               <p style="font-size: 14px; color: #666; line-height: 1.5;">If you encounter any issues or have any questions, please do not hesitate to contact our support team.</p>
               <p style="font-size: 14px; color: #666; line-height: 1.5;">We look forward to your active participation in our academic community.</p>
               <br>
               <p style="font-size: 14px; color: #666;">Best regards,</p>
               <p style="font-size: 14px; color: #666;">The EDAS Team</p>
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

      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ success: "true", token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error: ${err.message}`);
    }
  }
);

// --------------------------------------------------------------
// @route   GET api/student
// @desc    Get students details
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    let student = await Student.findById(req.student.id).select("-password");
    res.send(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   PUT api/student
// @desc    Update student details
// @access  Private

router.put("/", auth, async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    regnum,
    faculty,
    role,
    batch,
    courses,
  } = req.body;

  const studentFields = {};
  if (firstname) studentFields.firstname = firstname;
  if (lastname) studentFields.lastname = lastname;
  if (email) studentFields.email = email;
  if (phoneNumber) studentFields.phoneNumber = phoneNumber;
  if (regnum) studentFields.regnum = regnum;
  if (faculty) studentFields.faculty = faculty;
  if (role) studentFields.role = role;
  if (batch) studentFields.batch = batch;
  if (courses) studentFields.courses = courses;

  try {
    let student = await Student.findById(req.student.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      studentFields.password = await bcrypt.hash(password, salt);
    }

    student = await Student.findByIdAndUpdate(
      req.student.id,
      { $set: studentFields },
      { new: true }
    );

    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

//--------------------------------------------------------------
// @route   GET api/student
// @desc    Get all form hirarchy noyifications
// @access  Private

router.get("/tracking", auth, async (req, res) => {
  try {
    const form = await Form.find({ student: req.student.id })
      .sort({ date: -1 })
      .select("approvers");
    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }
    res.send(form);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// ---------------------------Student Dashboard Apis---------------------------------

// @route   GET api/student/submittedforms
// @desc    Get all submitted forms of students
// @access  Private

router.get("/submittedforms", auth, async (req, res) => {
  try {
    const form = await Form.find({ student: req.student.id }).count();
    res.json({ submittedFormValue: form });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/student/approvedforms
// @desc    Get the count of approved forms for a student
// @access  Private

router.get("/approvedforms", auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    const forms = await Form.find({ student: studentId });

    const approvedForms = forms.filter((form) => {
      return form.approvers.every((approver) => approver.approved);
    });

    res.json({ approvedFormCount: approvedForms.length });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/student/disapprovedforms
// @desc    Get the count of disapproved forms for a student
// @access  Private

router.get("/disapprovedforms", auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    const forms = await Form.find({ student: studentId });

    const disapprovedForms = forms.filter((form) => {
      return form.approvers.some((approver) => approver.disapproved);
    });

    res.json({ disapprovedFormCount: disapprovedForms.length });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/student/pendingforms
// @desc    Get the count of pending forms for a student
// @access  Private

router.get("/pendingforms", auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    const forms = await Form.find({ student: studentId });

    const pendingForms = forms.filter((form) => {
      let isPending = false;
      for (let i = 0; i < form.approvers.length; i++) {
        if (!form.approvers[i].approved) {
          isPending = true;
          break;
        }
      }
      return isPending;
    });

    res.json({ pendingFormCount: pendingForms.length });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

module.exports = router;
