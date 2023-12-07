const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const Admin = require("../models/Admin.js");
const Student = require("../models/Student.js");
const Faculty = require("../models/Faculty.js");
const auth = require("../middleware/auth.js");
const Course = require("../models/Courses.js");



// Create reusable transporter object using the default SMTP transport for nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdullah.mohammad2019274@gmail.com",
    pass: "ewoesymbrpbypxep",
  },
});

//-----------------Admin------------------
// @route   POST api/admin
// @desc    Register a student
// @access  Public

router.post(
  "/",
  [
    // Validations
    check("firstname", "Please enter a valid first name").not().isEmpty(),
    check("lastname", "Please enter a valid last name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
    check("phoneNumber", "Please enter a valid phone number").not().isEmpty(),
    check("role", "Please enter a valid role").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { firstname, lastname, email, password, phoneNumber, role } =
      req.body;

    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ msg: "Admin already exists" });
      }
      admin = new Admin({
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        role,
      });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();

      const payload = {
        admin: {
          id: admin.id,
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
          res.send({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  }
);

//-----------------Student------------------
// @route   Get api/admin/student/notapproved ----- applied at client side
// @desc    check new approval requests from students
// @access  Private

router.get("/student/notapproved", auth, async (req, res) => {
  try {
    const students = await Student.find({ accept: false });
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   Get api/admin/student/approved ----- applied at client side
// @desc    check approved students
// @access  Private

router.get("/student/approved", auth, async (req, res) => {
  try {
    const students = await Student.find({ accept: true });
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   Put /api/admin/student/approval/:id ----- applied at client side
// @desc    update the student by id
// @access  Private

router.put("/student/approval/:id", auth, async (req, res) => {
  const { accept } = req.body;
  const studentFields = {};
  studentFields.accept = accept; // Set the "accept" field regardless of its value

  try {
    let student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const result = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    );

    // If the student's account is approved, send an email
    if (accept) {
      let mailOptions = {
            from: "abdullah.mohammad2019274@gmail.com",
            to: student.email,
            subject: `EDAS Registration Approved - ${student.firstname} ${student.lastname}`,
            text: `Dear ${student.firstname} ${student.lastname},
          
            We are pleased to inform you that your registration request for the EDAS platform has been approved by the administration. You can now log in to your account using your registered email address and password to access all the features and services provided by EDAS.
            
            If you encounter any issues or have any questions, please do not hesitate to contact our support team.
            
            We look forward to your active participation in our academic community.
            
            Best regards,
            The EDAS Team
            `,
              html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
              <h1 style="font-size: 18px; color: #333;">Dear ${student.firstname} ${student.lastname},</h1>
              <h2 style="font-size: 16px; color: #333;">Your EDAS Registration has been Approved!</h2>
              <p style="font-size: 14px; color: #666; line-height: 1.5;">We are pleased to inform you that your registration request for the EDAS platform has been approved by the administration. You can now log in to your account using your registered email address and password to access all the features and services provided by EDAS.</p>
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
    }

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   Delete /api/admin/student/:id ----- applied at client side
// @desc    Delete the single student by id
// @access  Private

router.delete("/student/:id", auth, async (req, res) => {
  try {
    const result = await Student.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ msg: `Student with id ${id} not found` });
    }

    const mailOptions = {
      from: "abdullah.mohammad2019274@gmail.com",
      to: result.email,
      subject: `Your EDAS registration has been disapproved`,
      text: `Dear ${result.firstname} ${result.lastname},

            Your EDAS registration has been disapproved because the information you provided does not match our records. Please ensure that you provide correct data during the sign-up process, including:
            
            - First name
            - Last name
            - Email address
            - Phone number
            - Registration number
            - Batch
            - Faculty
            
            If you have any questions, please contact our support team.
            
            Best regards,
            The EDAS Team
            `,
                  html: `
            <div style="font-family: Arial, sans-serif;">
              <h1 style="font-size: 18px; color: #333;">Dear ${result.firstname} ${result.lastname},</h1>
              <h2 style="font-size: 16px; color: #333;">Your EDAS registration has been disapproved</h2>
              <p style="font-size: 14px; color: #666; text-indent: 30px;">Your EDAS registration has been disapproved because the information you provided does not match our records. Please ensure that you provide correct data during the sign-up process, including:</p>
              <ul style="font-size: 14px; color: #666;">
                <li>First name</li>
                <li>Last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Registration number</li>
                <li>Batch</li>
                <li>Faculty</li>
              </ul>
              <p style="font-size: 14px; color: #666;">If you have any questions, please contact our support team.</p>
              <br>
              <p style="font-size: 14px; color: #666;">Best regards,</p>
              <p style="font-size: 14px; color: #666;">The EDAS Team</p>
            </div>
          `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await Student.findByIdAndRemove(req.params.id);
    res.json({ msg: `Student removed.` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   Delete /api/admin/student/faculty/:id ----- applied at client side
// @desc    Delete the faculty by id
// @access  Private

router.delete("/student/remove/:id", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ msg: `Student with id ${id} not found` });
    }

    const mailOptions = {
      from: "abdullah.mohammad2019274@gmail.com",
      to: student.email,
      subject: `EDAS Account Deletion - ${student.firstname} ${student.lastname}`,
      text: `Dear ${student.firstname} ${student.lastname},
      
            We regret to inform you that your EDAS account has been deleted by the administration due to violation of our terms of service. This decision was made after a thorough review of your account and activity on the platform.
            
            Please note that any data or content associated with your account has also been removed from our servers. 
            
            If you have any questions or concerns, please contact our support team.
            
            Best regards,
            The EDAS Team
            `,
      html: `
            <div style="font-family: Arial, sans-serif;">
              <h1 style="font-size: 18px; color: #333;">Dear ${student.firstname} ${student.lastname},</h1>
              <h2 style="font-size: 16px; color: #333;">EDAS Account Deletion</h2>
              <p style="font-size: 14px; color: #666; text-indent: 30px;">We regret to inform you that your EDAS account has been deleted by the administration due to violation of our terms of service. This decision was made after a thorough review of your account and activity on the platform.</p>
              <p style="font-size: 14px; color: #666; text-indent: 30px;">Please note that any data or content associated with your account has also been removed from our servers.</p>
              <p style="font-size: 14px; color: #666;">If you have any questions or concerns, please contact our support team.</p>
              <br>
              <p style="font-size: 14px; color: #666;">Best regards,</p>
              <p style="font-size: 14px; color: #666;">The EDAS Team</p>
            </div>
            `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await Student.findByIdAndRemove(req.params.id);
    res.json({ msg: `Student removed.` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});




//-----------------Admin geting data of single student ----------

// @route   GET api/admin/student/:id
// @desc    Get a single student by ID
// @access  Private

router.get("/student/data/:id", auth, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id).select("-password");
    if (!student) return res.status(404).json({ msg: "Student not found" });

    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   PUT api/student/data/:id
// @desc    Update a single student by ID for admin
// @access  Private (admin)

router.put("/student/data/:id", auth, async (req, res) => {
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
    let student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      studentFields.password = await bcrypt.hash(password, salt);
    }

    student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: studentFields },
      { new: true }
    );

    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/admin/faculty/:id
// @desc    Get a single faculty by ID
// @access  Private

router.get("/faculty/data/:id", auth, async (req, res) => {
  try {
    let faculty = await Faculty.findById(req.params.id).select("-password");
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    res.json(faculty);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

module.exports = router;

// @route   PUT api/admin/faculty/data/:id
// @desc    Update a single faculty by ID
// @access  Private

router.put("/faculty/data/:id", auth, async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phoneNumber,
    department,
    role,
    subrole,
    courses,
    externalRoles,
  } = req.body;

  const facultyFields = {};
  if (firstname) facultyFields.firstname = firstname;
  if (lastname) facultyFields.lastname = lastname;
  if (email) facultyFields.email = email;
  if (phoneNumber) facultyFields.phoneNumber = phoneNumber;
  if (department) facultyFields.department = department;
  if (role) facultyFields.role = role;
  if (subrole) facultyFields.subrole = subrole;
  if (courses) facultyFields.courses = courses;
  if (externalRoles) facultyFields.externalRoles = externalRoles;

  try {
    let faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      facultyFields.password = await bcrypt.hash(password, salt);
    }

    faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { $set: facultyFields },
      { new: true }
    );

    res.json(faculty);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

//-----------------Faculty------------------
// @route   Put /api/admin/faculty/:id
// @desc    add external role to faculty
// @access  Private

router.put("/faculty/:id", auth, async (req, res) => {
  const { externalrole } = req.body;

  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    // Create a new role object based on the request body
    const newRole = {
      externalfaculty: externalrole[0].externalfaculty || null,
      role: externalrole[0].role || null,
      batch: externalrole[0].batch || null, // Use null if batch is not provided
    };

    // Add the new role object to the externalRoles array
    faculty.externalRoles.push(newRole);

    // Save the updated faculty document
    const result = await faculty.save();

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get /api/admin/faculty/notapproved ----- applied at client side
// @desc    check new approval requests from students
// @access  Private

router.get("/faculty/notapproved", auth, async (req, res) => {
  try {
    const faculty = await Faculty.find({ accept: false });
    res.json(faculty);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   Get /api/admin/faculty/approve ----- applied at client side
// @desc    check approved faculty
// @access  Private

router.get("/faculty/approve", auth, async (req, res) => {
  try {
    const faculty = await Faculty.find({ accept: true });
    res.json(faculty);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   PUT /api/admin/faculty/approval/:id ----- applied at client side
// @desc    Update the student by id
// @access  Private
//{ "accept": true } send this in body

router.put("/faculty/approval/:id", async (req, res) => {
  const { accept } = req.body;
  const facultyFields = {};
  facultyFields.accept = accept; // Set the "accept" field regardless of its value

  try {
    let faculty = await Faculty.findById(req.params.id);
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    const result = await Faculty.findByIdAndUpdate(
      req.params.id,
      { $set: facultyFields },
      { new: true }
    );

    // If the faculty's account is approved, send an email
    if (accept) {
      let mailOptions = {
        from: "abdullah.mohammad2019274@gmail.com",
        to: faculty.email,
        subject: `EDAS Registration Approved - ${faculty.firstname} ${faculty.lastname}`,
        text: `Dear ${faculty.firstname} ${faculty.lastname},
          
          We are pleased to inform you that your registration request for the EDAS platform has been approved by the administration. You can now log in to your account using your registered email address and password to access all the features and services provided by EDAS.
          
          If you encounter any issues or have any questions, please do not hesitate to contact our support team.
          
          We look forward to your active participation in our academic community.
          
          Best regards,
          The EDAS Team
          `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h1 style="font-size: 18px; color: #333;">Dear ${faculty.firstname} ${faculty.lastname},</h1>
            <h2 style="font-size: 16px; color: #333;">Your EDAS Registration has been Approved!</h2>
            <p style="font-size: 14px; color: #666; line-height: 1.5;">We are pleased to inform you that your registration request for the EDAS platform has been approved by the administration. You can now log in to your account using your registered email address and password to access all the features and services provided by EDAS.</p>
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
    }

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   Delete /api/admin/faculty/:id ----- applied at client side
// @desc    Delete the faculty by id
// @access  Private

router.delete("/faculty/:id", auth, async (req, res) => {
  try {
    const result = await Faculty.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ msg: `Faculty with id ${id} not found` });
    }

    const mailOptions = {
      from: "abdullah.mohammad2019274@gmail.com",
      to: result.email,
      subject: `Your EDAS Faculty Registration Has Been Disapproved`,
      text: `Dear ${result.firstname} ${result.lastname},

            Your EDAS faculty registration has been disapproved because the information you provided does not match our records. Please ensure that you provide correct data during the sign-up process, including:
            
            - First name
            - Last name
            - Email address
            - Faculty (e.g., Computer Science)
            - Designation (e.g., Professor)
            - Phone number
            
            If you have any questions, please contact our support team.
            
            Best regards,
            The EDAS Team
            `,
                  html: `
            <div style="font-family: Arial, sans-serif;">
              <h1 style="font-size: 18px; color: #333;">Dear ${result.firstname} ${result.lastname},</h1>
              <h2 style="font-size: 16px; color: #333;">Your EDAS Faculty Registration Has Been Disapproved</h2>
              <p style="font-size: 14px; color: #666; text-indent: 30px;">Your EDAS faculty registration has been disapproved because the information you provided does not match our records. Please ensure that you provide correct data during the sign-up process, including:</p>
              <ul style="font-size: 14px; color: #666;">
                <li>First name</li>
                <li>Last name</li>
                <li>Email address</li>
                <li>Faculty (e.g., Computer Science)</li>
                <li>Designation (e.g., Professor)</li>
                <li>Phone number</li>
              </ul>
              <p style="font-size: 14px; color: #666;">If you have any questions, please contact our support team.</p>
              <br>
              <p style="font-size: 14px; color: #666;">Best regards,</p>
              <p style="font-size: 14px; color: #666;">The EDAS Team</p>
            </div>
            `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });


    await Faculty.findByIdAndRemove(req.params.id);
    res.json({ msg: `Faculty removed.` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// @route   Delete /api/admin/remove/faculty/:id ----- applied at client side
// @desc    Delete the faculty by id
// @access  Private

router.delete("/faculty/remove/:id", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ msg: `Faculty with id ${id} not found` });
    }

    const mailOptions = {
      from: "abdullah.mohammad2019274@gmail.com",
      to: faculty.email,
      subject: `EDAS Account Deletion - ${faculty.firstname} ${faculty.lastname}`,
      text: `Dear ${faculty.firstname} ${faculty.lastname},
      
            We regret to inform you that your EDAS account has been deleted by the administration due to violation of our terms of service. This decision was made after a thorough review of your account and activity on the platform.
            
            Please note that any data or content associated with your account has also been removed from our servers. 
            
            If you have any questions or concerns, please contact our support team.
            
            Best regards,
            The EDAS Team
            `,
      html: `
            <div style="font-family: Arial, sans-serif;">
              <h1 style="font-size: 18px; color: #333;">Dear ${faculty.firstname} ${faculty.lastname},</h1>
              <h2 style="font-size: 16px; color: #333;">EDAS Account Deletion</h2>
              <p style="font-size: 14px; color: #666; text-indent: 30px;">We regret to inform you that your EDAS account has been deleted by the administration due to violation of our terms of service. This decision was made after a thorough review of your account and activity on the platform.</p>
              <p style="font-size: 14px; color: #666; text-indent: 30px;">Please note that any data or content associated with your account has also been removed from our servers.</p>
              <p style="font-size: 14px; color: #666;">If you have any questions or concerns, please contact our support team.</p>
              <br>
              <p style="font-size: 14px; color: #666;">Best regards,</p>
              <p style="font-size: 14px; color: #666;">The EDAS Team</p>
            </div>
            `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await Faculty.findByIdAndRemove(req.params.id);
    res.json({ msg: `Faculty removed.` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// -----------------Admin adding cources in courses list and geeting them -----------
// @route   POST api/admin/course
// @desc    Add a new course
// @access  Private (Admin)

router.post("/course", auth, async (req, res) => {
  try {
    const { name } = req.body;

    // Find the existing course document
    let courseDocument = await Course.findOne();

    // If no course document exists, create a new one with the given course
    if (!courseDocument) {
      courseDocument = new Course({
        courses: [{ name }],
      });
    } else {
      // If a course document exists, add the new course to the courses array
      courseDocument.courses.push({ name });
    }

    // Save the course document
    await courseDocument.save();

    // Send the updated course document as a response
    res.json(courseDocument);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/course
// @desc    Get all courses
// @access  Private (Admin)
router.get("/course", async (req, res) => {
  try {
    // Find all course documents
    const courses = await Course.find().select("courses.name");

    // Send the found courses as a response
    res.json(courses);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

module.exports = router;
