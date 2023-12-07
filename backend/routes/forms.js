const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
// const path = require('path');
const auth = require("../middleware/auth");
// const upload = multer({ dest: 'uploads/' });
const config = require("config");
const crypto = require("crypto");

const Student = require("../models/Student");
const Form = require("../models/Form");
const Faculty = require("../models/Faculty");

//s3-bucket
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const aws_Access_Key = config.get("ACCESS_KEY_ID"); // AWS access key
const aws_Secret_Access_Key = config.get("SECRET_ACCESS_KEY"); // AWS secret key
const aws_Bucket_Name = config.get("BUCKET_NAME"); // AWS region
const aws_Region = config.get("BUCKET_REGION"); // AWS bucket name

const s3 = new S3Client({
  region: aws_Region,
  credentials: {
    accessKeyId: aws_Access_Key,
    secretAccessKey: aws_Secret_Access_Key,
  },
  region: aws_Region,
});

// Set up your email transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdullah.mohammad2019274@gmail.com",
    pass: "ewoesymbrpbypxep",
  },
});

//--------------------------------------------------------------------------------------------//-
// const storage = multer.diskStorage({                                                       //-
//   destination: function(req,file,callback){                                                //-
//     return callback(null, './uploads');                                                    //-
//   },                                                                                       //-
//   filename: function(req, file, callback){                                                 //-
//      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));  //-
//   }                                                                                        //-
// });                                                                                        //-
// const upload = multer({storage: storage});                                                 //-
//--------------------------------------------------------------------------------------------//-

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   GET api/forms
// @desc    Get all the specific student's forms
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const forms = await Form.find({ student: req.student.id }).sort({
      date: -1,
    });
    const student = await Student.findOne({ _id: forms[0].student });

    for (const form of forms) {
      if (form.image) {
        const getObjectPatams = {
          Bucket: aws_Bucket_Name,
          Key: form.image,
        };
        const command = new GetObjectCommand(getObjectPatams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        form.image = url;
      }
    }

    res.json({ student, forms });
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
});


// @route   GET /forms/student/all
// @desc    Get all student forms with image URLs
// @access  Private
router.get("/student/all", auth, async (req, res) => {
  try {
    const forms = await Form.find({
      student: { $exists: true },
      faculty: { $exists: true },
      formName: { $exists: true },
    }).populate("student");

    const formsWithImageUrls = [];

    for (const form of forms) {
      if (form.image) {
        const getObjectParams = {
          Bucket: aws_Bucket_Name,
          Key: form.image,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        form.image = url;
      }
      formsWithImageUrls.push(form);
    }

    res.json(formsWithImageUrls);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// @route   GET /forms/faculty/all
// @desc    Get all faculty forms with image URLs
// @access  Private
router.get("/faculty/all", auth, async (req, res) => {
  try {
    const forms = await Form.find({
      faculty: { $exists: true },
      department: { $exists: true },
    }).populate({ path: "faculty", model: "faculty" }).lean();

    const formsWithImageUrls = [];

    for (const form of forms) {
      if (form.image) {
        const getObjectParams = {
          Bucket: aws_Bucket_Name,
          Key: form.image,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        form.image = url;
      }
      formsWithImageUrls.push(form);
    }

    res.json(formsWithImageUrls);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});



// @route   GET api/forms/faculty
// @desc    Get all the specific faculty's forms
// @access  Private

router.get("/faculty", auth, async (req, res) => {
  try {
    const forms = await Form.find({ faculty: req.faculty.id }).sort({
      date: -1,
    });
    const faculty = await Faculty.findOne({ _id: forms[0].faculty });
    for (const form of forms) {
      if (form.image) {
        const getObjectPatams = {
          Bucket: aws_Bucket_Name,
          Key: form.image,
        };
        const command = new GetObjectCommand(getObjectPatams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        form.image = url;
      }
    }

    res.json({ faculty, forms });
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
});

// @route   POST api/forms
// @desc    Add new form for student
// @access  Private
// 'formDocument' is the name of the file input field in the form

// router.post(
//   "/",
//   [
//     auth,
//     upload.single("formDocument"),
//     [check("formName", "Form Name is required").not().isEmpty()],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { formName, responces, approvalHierarchy, faculty } = req.body;

//     //crypto function of imange name
//     const imageName = req.file ? crypto.randomBytes(32).toString("hex") : null;
//     // Uploading the file in S3 Bucket
//     if (req.file) {
//       const command = new PutObjectCommand({
//         Bucket: aws_Bucket_Name,
//         Key: imageName,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype,
//       });

//       await s3.send(command);
//     }
//     try {
//       const student = await Student.findOne({ _id: req.student.id });
//       const approvers = Form.createApprovers(approvalHierarchy);
//       const form = new Form({
//         student: req.student.id,
//         formName,
//         faculty,
//         responces,
//         approvers,
//         image: imageName,
//       });
//       const submittedForm = await form.save();
//       res.json(submittedForm);
//       // Iterate through the approval hierarchy
//       for (const role of approvalHierarchy) {
//         let approverFaculty;
//         if (role === "advisor") {
//           approverFaculty = await Faculty.findOne({
//             "externalRoles.role": role,
//             department: student.faculty,
//             "externalRoles.batch": student.batch,
//           });
//         } else if (role === "dean") {
//           approverFaculty = await Faculty.findOne({
//             "externalRoles.role": role,
//             department: student.faculty,
//           });
//         }

//         if (approverFaculty) {
//           // Send email to the approver
//           const mailOptions = {
//             from: "abdullah.mohammad2019274@gmail.com", // Your email address
//             to: approverFaculty.email,
//             subject: "New Form Submission",
//             text:
//               `Dear ${approverFaculty.firstname} ${approverFaculty.lastname},\n\n` +
//               `A new form titled "${formName}" has been submitted by ${student.firstname} ${student.lastname} (Faculty: ${student.faculty}, Batch: ${student.batch}) and requires your approval.\n\n` +
//               `Please find the details below:\n\n` +
//               `Student Name: ${student.firstname} ${student.lastname}\n` +
//               `Faculty: ${student.faculty}\n` +
//               `Batch: ${student.batch}\n\n` +
//               `Please log in to the system to review and approve or reject the form.\n\n` +
//               `Thank you`,
//           };
//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.log(error);
//             } else {
//               console.log("Email sent: " + info.response);
//             }
//           });
//         }
//       }
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send(`Server Error: ${error.message}`);
//     }
//   }
// );


// @route   POST api/forms/data
// @desc    Add new form data for student
// @access  Private
router.post(
  "/data",
  [
    auth,
    [check("formName", "Form Name is required").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { formName, responces, approvalHierarchy, faculty } = req.body;

    try {
      const student = await Student.findOne({ _id: req.student.id });
      const approvers = Form.createApprovers(approvalHierarchy);
      const form = new Form({
        student: req.student.id,
        formName,
        faculty,
        responces,
        approvers,
      });
      const submittedForm = await form.save();
      res.json(submittedForm);
      // ...
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  }
);


// @route   POST api/forms/file
// @desc    Add file for the form
// @access  Private
router.post(
  "/file",
  [
    auth,
    upload.single("formDocument"),
  ],
  async (req, res) => {
    // Check if the file is being parsed correctly
    // console.log("Parsed file:", req.file);

    //crypto function of image name
    const imageName = req.file ? crypto.randomBytes(32).toString("hex") : null;
    // Uploading the file in S3 Bucket
    if (req.file) {
      const command = new PutObjectCommand({
        Bucket: aws_Bucket_Name,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      // Check the AWS SDK configuration
      // console.log("AWS SDK configuration:", s3.config);

      try {
        await s3.send(command);
      } catch (error) {
        // console.error("Error uploading file to S3:", error.message);
        return res.status(500).send(`S3 Upload Error: ${error.message}`);
      }

      try {
        const form = await Form.findOne({ _id: req.body.formId });
        if (!form) {
          // console.error("Form not found:", req.body.formId);
          return res.status(404).send("Form not found");
        }

        form.image = imageName;
        await form.save();
        res.json({ message: "File uploaded successfully", imageName });
      } catch (error) {
        // console.error("Error updating form:", error.message);
        res.status(500).send(`Server Error: ${error.message}`);
      }
    } else {
      res.status(400).send("No file provided");
    }
  }
);




// @route   POST api/forms/faculty
// @desc    Add new form for faculty
// @access  Private

// router.post(
//   "/faculty",
//   [
//     auth,
//     upload.single("formDocument"),
//     [check("formName", "Form Name is required").not().isEmpty()],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { formName, responces, approvalHierarchy, department } = req.body;
//     try {
//       const faculty = await Faculty.findOne({ _id: req.faculty.id });
//       if (!faculty) {
//         return res.status(400).json({ msg: "Faculty not found" });
//       }
//       const approvers = Form.createApprovers(approvalHierarchy);
//       const form = new Form({
//         faculty: req.faculty.id,
//         formName,
//         responces,
//         department,
//         approvers,
//       });
//       const submittedForm = await form.save();
//       res.json(submittedForm);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send(`Server Error: ${error.message}`);
//     }
//   }
// );


// Route for handling form data
router.post(
  "/faculty/data",
  [auth, check("formName", "Form Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { formName, responces, approvalHierarchy, department } = req.body;
    try {
      const faculty = await Faculty.findOne({ _id: req.faculty.id });
      if (!faculty) {
        return res.status(400).json({ msg: "Faculty not found" });
      }
      const approvers = Form.createApprovers(approvalHierarchy);
      const form = new Form({
        faculty: req.faculty.id,
        formName,
        responces,
        department,
        approvers,
      });
      const submittedForm = await form.save();
      res.json(submittedForm);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
    }
  }
);

// Route for handling file upload
router.post(
  "/faculty/file",
  [auth, upload.single("formDocument")],
  async (req, res) => {
    // console.log("Parsed file:", req.file);

    const imageName = req.file ? crypto.randomBytes(32).toString("hex") : null;

    if (req.file) {
      const command = new PutObjectCommand({
        Bucket: aws_Bucket_Name,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      // console.log("AWS SDK configuration:", s3.config);

      try {
        await s3.send(command);
      } catch (error) {
        // console.error("Error uploading file to S3:", error.message);
        return res.status(500).send(`S3 Upload Error: ${error.message}`);
      }

      try {
        const form = await Form.findOne({ _id: req.body.formId });
        if (!form) {
          // console.error("Form not found:", req.body.formId);
          return res.status(404).send("Form not found");
        }

        form.image = imageName;
        await form.save();
        res.json({ message: "File uploaded successfully", imageName });
      } catch (error) {
        // console.error("Error updating form:", error.message);
        res.status(500).send(`Server Error: ${error.message}`);
      }
    } else {
      res.status(400).send("No file provided");
    }
  }
);


//-----------------------------------API for Admin Dashboard----------------------------------------------

// @route   GET api/forms/names
// @desc    Get all the form names
// @access  Private

router.get("/names", async (req, res) => {
  try {
    const formNames = await Form.distinct("formName");
    res.json(formNames);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form names" });
  }
});



// @route   GET api/forms/formStats
// @desc    Get all the forms
// @access  Private

router.get("/formStats", auth, async (req, res) => {
  try {
    const { time, faculty, formName } = req.query;

    let startDate = new Date();
    let endDate = new Date();
    
    // If time is 'all', we don't want to filter by date range
    if (time !== "all") {
      switch (time) {
        case "today":
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(23, 59, 59, 999);
          break;
        case "yesterday":
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
          endDate.setDate(endDate.getDate() - 1);
          endDate.setHours(23, 59, 59, 999);
          break;
        case "lastWeek":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "lastMonth":
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case "lastYear":
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          return res.status(400).json({ msg: "Invalid time range" });
      }
    }

    const query = {};

    if (faculty !== "all") {
      query.faculty = faculty;
    }

    if (formName !== "all") {
      query.formName = formName;
    }

    const forms = await Form.find(query);

    let totalForms = 0;
    let approvedForms = 0;
    let rejectedForms = 0;
    let pendingForms = 0;

    // Create an array to store the counts for each day of the week
    let formsByDayOfWeek = [0, 0, 0, 0, 0, 0, 0];

    forms.forEach((form) => {
      // Only count forms that fall within the selected date range
      if (time === "all" || (form.date >= startDate && form.date <= endDate)) {
        totalForms++;

        const allApproved = form.approvers.every((approver) => approver.approved);
        const anyRejected = form.approvers.some((approver) => approver.disapproved);

        if (allApproved) {
          approvedForms++;
        } else if (anyRejected) {
          rejectedForms++;
        } else {
          pendingForms++;
        }

        // Increment the count for the day of the week on which the form was submitted
        const dayOfWeek = form.date.getDay();
        formsByDayOfWeek[dayOfWeek]++;
      }
    });

    res.json({
      totalForms,
      approvedForms,
      rejectedForms,
      pendingForms,
      formsByDayOfWeek,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});






//-----------------------------------API for Admin Dashboard showing current and pending users----------------------------------------------

// @route   GET api/forms/userStats
// @desc    Get all the forms
// @access  Private

router.get("/userStats", async (req, res) => {
  try {
    const approvedStudents = await Student.countDocuments({ accept: true });
    const pendingStudents = await Student.countDocuments({ accept: false });
    const approvedFaculty = await Faculty.countDocuments({ accept: true });
    const pendingFaculty = await Faculty.countDocuments({ accept: false });

    const totalApproved = approvedStudents + approvedFaculty;
    const totalPending = pendingStudents + pendingFaculty;

    res.json({
      totalApproved,
      totalPending,
      students: {
        approved: approvedStudents,
        pending: pendingStudents,
      },
      faculty: {
        approved: approvedFaculty,
        pending: pendingFaculty,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user stats" });
  }
});






module.exports = router;
