const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const Admin = require("../models/Admin.js");
const Student = require("../models/Student.js");
const Faculty = require("../models/Faculty.js");



const auth = require("../middleware/auth.js");

//-------------------------STUDENT-------------------------//
// @route   GET api/auth/student
// @desc    Get the logged STUDENT and token
// @access  Private

router.get("/student", auth, async (req, res) => {
  try {
    let student = await Student.findById(req.student.id).select("-password");
    res.json(student);
  } catch (error) {
    if (error) throw error;
    return res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   POST api/auth/student ----- applied at client side
// @desc    Authorize a student and get the token
// @access  Public

router.post(
  "/student",
  [
    // Validations
   check("email", "Please enter a valid email address").isEmail(),

    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
      const student = await Student.findOne({ email });
      if (!student) {
        return res
          .status(400)
          .json({ msg: "Invalid registration number or password !student" });
      }

      // Check if the student is approved by admin
      if (!student.accept) {
        return res.status(401).json({ msg: "Student has not been approved by the admin" });
      }

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalid registration number or password !isMatch" });
      }

      const payload = {
        student: {
          id: student.id,
          faculty: student.faculty,
          regnumber: student.regnum,
          role: student.role,
        },
      };
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
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  }
);

//-------------------------ADMIN-------------------------//
// @route   GET api/auth/admin
// @desc    Get the logged STUDENT and token
// @access  Private

router.get("/admin", auth, async (req, res) => {
  try {
    let admin = await Admin.findById(req.admin.id).select("-password");
    res.json(admin);
  } catch (err) {
    if (err) throw err;
    return res.status(500).send("Server Error");
  }
});

// @route   GET api/auth/admin ----- applied at client side
// @desc    Get the logged ADMIN and token
// @access  Public

router.post(
  "/admin",
  [
    // Validations
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(400)
          .json({ msg: "Invalid email or password !admin" });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalid email or password !matched" });
      }

      const payload = {
        admin: {
          id: admin.id,
          firstname: admin.firstname,
          lastname: admin.lastname,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  }
);

//-------------------------FACULTY-------------------------//
// @route   POST api/auth/faculty ----- applied at client side
// @desc    Get the logged FACULTY and token
// @access  Private

router.post(
  "/faculty",
  [
      check("email", "Please enter a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 8 or more characters"
      ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
      let faculty = await Faculty.findOne({ email });
      if (!faculty) {
        return res
          .status(400)
          .json({ msg: "Invalid email or password !faculty" });
      }

      // Check if the faculty is accepted
       if (!faculty.accept) {
        return res.status(401).json({ msg: "Faculty has not been accepted" });
      }

      const isMatch = await bcrypt.compare(password, faculty.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ msg: "Invalid email or password !matched" });
      }

      const payload = {
        faculty: {
          id: faculty.id,
          firstname: faculty.firstname,
          lastname: faculty.lastname,
          role: faculty.role,
          department: faculty.department,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  }
);

module.exports = router;
