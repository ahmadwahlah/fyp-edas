const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');	
const auth = require('../middleware/auth');


const Faculty = require('../models/Faculty');
const Form = require('../models/Form');
const Student = require('../models/Student');



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




// Create reusable transporter object using the default SMTP transport for nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abdullah.mohammad2019274@gmail.com",
    pass: "ewoesymbrpbypxep",
  },
});



//-----------------FacultySignUp------------------
// @route POST api/faculty  ----- applied at client side
// @desc Register a faculty
// @access Public

router.post('/',
 [
    // Validations
    check('firstname', 'Please enter your firstname').not().isEmpty(),
    check('lastname', 'Please enter your lastname').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    check('phoneNumber', 'Please enter a valid phone number').isLength({ min: 11 }),
    check('department', 'Please enter your faculty').not().isEmpty(),
    check('role', 'Please enter your faculty role').not().isEmpty(),
    check('subrole', 'Please enter your faculty subrole').not().isEmpty(),
    check('phoneNumber', 'Please enter a valid phone number').isLength({ min: 11 }),
], 

async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { firstname, lastname, email, password, phoneNumber, department, role, subrole } = req.body;
    try {
      let student = await Student.findOne({ email });
      if (student) {
        return res.status(400).json({ msg: "Email already registered by student or faculty." });
      }
      let facultyMember = await Faculty.findOne({ email });
      if (facultyMember) {
          return res.status(400).json({ msg: 'Email already registered by student or faculty.' });
      }
  
      facultyMember = new Faculty({
          firstname,
          lastname,
          email,
          password,
          department,
          role,
          subrole,
          phoneNumber
      });
  
      const salt = await bcrypt.genSalt(10);
      facultyMember.password = await bcrypt.hash(password, salt);
      await facultyMember.save();
  
      const payload = {
          faculty: {
              id: facultyMember.id,
              firstname: facultyMember.firstname,
              lastname: facultyMember.lastname,
            },
      };

      // send email to faculty member
      let mailOptions = {
        from: "abdullah.mohammad2019274@gmail.com",
        to: email,
        subject: `Welcome to EDAS, ${subrole} ${firstname} ${lastname}`,
        text: `Dear ${subrole} ${firstname} ${lastname},
      
             We are delighted to welcome you to the EDAS platform at GIKI. We have received your registration request and will verify your information. You will receive another email once your account is approved by the administrator.
             
             If you encounter any issues or have any questions, please do not hesitate to contact our support team.
             
             We look forward to your active participation in our academic community.
             
             Best regards,
             The EDAS Team
             `,
               html: `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
               <h1 style="font-size: 18px; color: #333;">Dear ${subrole} ${firstname} ${lastname},</h1>
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

  
      jwt.sign(payload, config.get('jwtsecret'), {
          expiresIn: 360000
      }, (err, token) => {
          if (err) throw err;
          res.json({ token });
      });
  }catch(error){
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
  }
  
});

// @route GET api/faculty
// @desc getting data of single faculty member on the base of jwt token
// @access Private


router.get('/', auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id).select('-password');
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }
    res.json(faculty);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   PUT api/faculty/update
// @desc    Update single faculty member details on the base of jwt token
// @access  Private

router.put("/update", auth, async (req, res) => {
  const {firstname,lastname,email,password,department,role,subrole,accept,phoneNumber,externalRoles,courses} = req.body;

  const facultyFields = {};
  if (firstname) facultyFields.firstname = firstname;
  if (lastname) facultyFields.lastname = lastname;
  if (email) facultyFields.email = email;
  if (department) facultyFields.department = department;
  if (role) facultyFields.role = role;
  if (subrole) facultyFields.subrole = subrole;
  if (accept !== undefined) facultyFields.accept = accept;
  if (phoneNumber) facultyFields.phoneNumber = phoneNumber;
  if (externalRoles) facultyFields.externalRoles = externalRoles;
  if (courses) facultyFields.courses = courses;

  try {
    let faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) return res.status(404).json({ msg: "Faculty not found" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      facultyFields.password = await bcrypt.hash(password, salt);
    }

    faculty = await Faculty.findByIdAndUpdate(
      req.faculty.id,
      { $set: facultyFields },
      { new: true }
    );

    res.json(faculty);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


//--------------------------------------------------Getting All Student Forms----------------------------------------------------------
// @route GET api/faculty/studentForms
// @desc get the form according to hirerchcy like advisor or dean
// @access Private

// router.get("/studentForms", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const matchedForms = {};

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         faculty: externalRole.externalfaculty,
//       }).populate("student");

//       matchedForms[role] = [];

//       forms.forEach((form) => {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );

//         if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
//           // Skip the form if the previous approver hasn't approved it yet
//           return;
//         }

//         // Add custom filters for each role as needed
//         let shouldAddForm = true;

//         if (role === "advisor") {
//           // Filter forms where the advisor's batch matches the student's batch
//           shouldAddForm = form.student.batch == externalRole.batch;
//         } else if (role === "dean") {
//           shouldAddForm = form.student.faculty === faculty.department;
//         }

//         // Add any additional role-based filters here

//         if (shouldAddForm) {
//           matchedForms[role].push(form);
//         }
//       });
//     }

//     res.json(matchedForms[faculty.externalRoles[0].role]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });

//-------------------------------------------------------------------------Working CODE------------------------------------------------------------
// router.get("/studentForms", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const matchedForms = {};

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         faculty: externalRole.externalfaculty,
//       }).populate("student");

//       matchedForms[role] = [];

//       forms.forEach((form) => {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );


//          // for (const form of forms) {
//         //   if (form.image) {
//         //     const getObjectPatams = {
//         //       Bucket: aws_Bucket_Name,
//         //       Key: form.image,
//         //     };
//         //     const command = new GetObjectCommand(getObjectPatams);
//         //     const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
//         //     form.image = url;
//         //   }
//         // }

//         if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
//           // Skip the form if the previous approver hasn't approved it yet
//           return;
//         }

//         const isFormReviewed = form.approvers[approverIndex].approved || form.approvers[approverIndex].disapproved;

//         // Add custom filters for each role as needed
//         let shouldAddForm = true;

//         if (role === "advisor") {
//           // Filter forms where the advisor's batch matches the student's batch
//           shouldAddForm = form.student.batch == externalRole.batch;
//         } else if (role === "dean") {
//           shouldAddForm = form.student.faculty === faculty.department;
//         }

//         // Add any additional role-based filters here

//         if (shouldAddForm && !isFormReviewed) {
//           matchedForms[role].push(form);
//         }
//       });
//     }

//     res.json(matchedForms[faculty.externalRoles[0].role]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// router.get("/studentForms", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const matchedForms = {};

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         faculty: externalRole.externalfaculty,
//       }).populate("student");

//       matchedForms[role] = [];

//       for (const form of forms) {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );

//         if (form.image) {
//           const getObjectParams = {
//             Bucket: aws_Bucket_Name,
//             Key: form.image,
//           };
//           const command = new GetObjectCommand(getObjectParams);
//           const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
//           form.image = url;
//         }

//         if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
//           // Skip the form if the previous approver hasn't approved it yet
//           return;
//         }

//         const isFormReviewed = form.approvers[approverIndex].approved || form.approvers[approverIndex].disapproved;

//         let shouldAddForm = true;

//         if (role === "advisor") {
//           // Filter forms where the advisor's batch matches the student's batch
//           shouldAddForm = externalRole.batch && form.student && form.student.batch == externalRole.batch;
//         }else if (role === "dean") {
//           shouldAddForm = form.student.faculty === faculty.department;
//         }

//         // Add any additional role-based filters here

//         if (shouldAddForm && !isFormReviewed) {
//           matchedForms[role].push(form);
//         }
//       }
//     }

//     res.json(matchedForms[faculty.externalRoles[0].role]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });

// router.get("/studentForms", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const matchedForms = {};

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         faculty: externalRole.externalfaculty,
//       }).populate("student");

//       matchedForms[role] = [];

//       for (const form of forms) {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );

//         if (form.image) {
//           const getObjectParams = {
//             Bucket: aws_Bucket_Name,
//             Key: form.image,
//           };
//           const command = new GetObjectCommand(getObjectParams);
//           const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
//           form.image = url;
//         }

//         if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
//           // Skip the form if the previous approver hasn't approved it yet
//           continue;
//         }

//         const isFormReviewed = form.approvers[approverIndex].approved || form.approvers[approverIndex].disapproved;

//         let shouldAddForm = true;

//         if (role === "advisor") {
//           // Filter forms where the advisor's batch matches the student's batch
//           shouldAddForm = externalRole.batch && form.student && form.student.batch == externalRole.batch;
//         } else if (role === "dean") {
//           shouldAddForm = form.student.faculty === faculty.department;
//         }else if (role === "Rector" || role === "Pro-Rector (A)" || role === "Pro-Rector (A&F)") {
//           shouldAddForm = true;
//         }

//         // Add any additional role-based filters here

//         if (shouldAddForm && !isFormReviewed) {
//           matchedForms[role].push(form);
//         }
//       }
//     }

//     res.json(matchedForms[faculty.externalRoles[0].role]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });


router.get("/studentForms", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    const matchedForms = {};

    for (const externalRole of faculty.externalRoles) {
      const role = externalRole.role;

      const forms = await Form.find({
        "approvers.role": role,
        faculty: externalRole.externalfaculty,
      }).populate("student");

      matchedForms[role] = [];

      for (const form of forms) {
        const approverIndex = form.approvers.findIndex(
          (approver) => approver.role === role
        );

        if (form.image) {
          const getObjectParams = {
            Bucket: aws_Bucket_Name,
            Key: form.image,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          form.image = url;
        }

        // if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
        //   // Skip the form if the previous approver hasn't approved it yet
        //   continue;
        // }

        if (approverIndex > 0 && (!form.approvers[approverIndex - 1].approved || form.approvers[approverIndex - 1].disapproved)) {
          // Skip the form if the previous approver hasn't approved it yet or has disapproved it
          continue;
        }

        const isFormReviewed = form.approvers[approverIndex].approved || form.approvers[approverIndex].disapproved;

        let shouldAddForm = true;

        if (role === "advisor") {
          // Filter forms where the advisor's batch matches the student's batch
          shouldAddForm = externalRole.batch && form.student && form.student.batch == externalRole.batch;
        } else if (role === "dean") {
          shouldAddForm = form.student.faculty === faculty.department;
        } else if (role === "Rector" || role === "Pro-Rector (A)" || role === "Pro-Rector (A&F)") {
          shouldAddForm = true;
        }

        // Add any additional role-based filters here

        if (shouldAddForm && !isFormReviewed) {
          matchedForms[role].push(form);
        }
      }
    }

    res.json(matchedForms[faculty.externalRoles[0].role]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});






// router.get("/pendingStudentForms", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const pendingForms = [];

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         faculty: externalRole.externalfaculty,
//       }).populate("student");

//       forms.forEach((form) => {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );

//         const isCurrentApprover = approverIndex === 0 || form.approvers[approverIndex - 1].approved;
//         const hasCurrentApproverApproved = form.approvers[approverIndex].approved;

//         // Add custom filters for each role as needed
//         let shouldAddForm = true;

//         if (role === "advisor") {
//           // Filter forms where the advisor's batch matches the student's batch
//           shouldAddForm = form.student.batch == externalRole.batch;
//         } else if (role === "dean") {
//           shouldAddForm = form.student.faculty === faculty.department;
//         }

//         // Add any additional role-based filters here

//         if (shouldAddForm && isCurrentApprover && !hasCurrentApproverApproved) {
//           pendingForms.push(form);
//         }
//       });
//     }

//     res.json(pendingForms);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });



// @route GET api/faculty/studentForms/approvedOrDisapproved
// @desc Get all the forms approved or disapproved by the faculty members
// @access Private

// router.get("/studentForms/approvedOrDisapproved", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const approvedOrDisapprovedForms = [];

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         faculty: externalRole.externalfaculty,
//       }).populate("student");

//       forms.forEach((form) => {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );

//         // Check if the form is approved or disapproved by the current faculty member
//         if (
//           form.approvers[approverIndex].approved ||
//           form.approvers[approverIndex].disapproved
//         ) {
//           approvedOrDisapprovedForms.push(form);
//         }
//       });
//     }

//     res.json(approvedOrDisapprovedForms);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });


router.get("/studentForms/approvedOrDisapproved", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    const approvedOrDisapprovedForms = [];

    for (const externalRole of faculty.externalRoles) {
      const role = externalRole.role;

      const forms = await Form.find({
        "approvers.role": role,
        faculty: externalRole.externalfaculty,
      }).populate("student");

      for (const form of forms) {
        const approverIndex = form.approvers.findIndex(
          (approver) => approver.role === role
        );

        let imageUrl;
        if (form.image) {
          const getObjectParams = {
            Bucket: aws_Bucket_Name,
            Key: form.image,
          };
          const command = new GetObjectCommand(getObjectParams);
          imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
        }

        // Check if the form is approved or disapproved by the current faculty member
        if (
          form.approvers[approverIndex].approved ||
          form.approvers[approverIndex].disapproved
        ) {
          const formWithImageUrl = {
            ...form.toObject(),
            image: imageUrl,
          };
          approvedOrDisapprovedForms.push(formWithImageUrl);
        }
      }
    }

    res.json(approvedOrDisapprovedForms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// @route GET api/faculty/facultyForms
// @desc get the form according to hirerchcy like  or dean
// @access Private

// router.get("/facultyForms", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const matchedForms = {};

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         $or: [
//           { department: externalRole.externalfaculty },
//           { "approvers.role": { $in: ["HR", "Rector"] } },
//         ],
//       }).populate({ path: "faculty", model: "faculty" });

//       matchedForms[role] = [];

//       forms.forEach((form) => {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );
      
//         if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
//           // Skip the form if the previous approver hasn't approved it yet
//           return;
//         }
      
//         // Add custom filters for each role as needed
//         let shouldAddForm = true;
      
//         if (role === "dean") {
//           shouldAddForm = form.faculty.department === faculty.department;
//         } else if (role === "Committee Convener") {
//           shouldAddForm = form.faculty.department === faculty.department;
//         } else if (role === "HR" || role === "Rector" || role === "Pro-Rector (A)" || role === "Pro-Rector (A&F)" || role === "Director Facilitation" || role === "Account Section" || role === "IT Manager" || role === "Transportation Manager" || role === "Security Manager" || role === "Incharge of Guest House" || role === "Secretary of Faculty Club") {
//           shouldAddForm = true;
//         }
      
//         // Add any additional role-based filters here
      
//         if (shouldAddForm) {
//           matchedForms[role].push(form);
//         }
//       });
//   }

//     res.json(matchedForms[faculty.externalRoles[0].role]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });

//----------------------------------------------------------this is the working code----------------------------------------------

// router.get("/facultyForms", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const pendingForms = [];

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         $or: [
//           { department: externalRole.externalfaculty },
//           { "approvers.role": { $in: ["HR", "Rector"] } },
//         ],
//       }).populate({ path: "faculty", model: "faculty" });

//       forms.forEach((form) => {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );

//         // for (const form of forms) {
//         //   if (form.image) {
//         //     const getObjectPatams = {
//         //       Bucket: aws_Bucket_Name,
//         //       Key: form.image,
//         //     };
//         //     const command = new GetObjectCommand(getObjectPatams);
//         //     const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
//         //     form.image = url;
//         //   }
//         // }

//         const isCurrentApprover = approverIndex === 0 || form.approvers[approverIndex - 1].approved;
//         const isFormReviewed = form.approvers[approverIndex].approved || form.approvers[approverIndex].disapproved;

//         // Add custom filters for each role as needed
//         let shouldAddForm = true;

//         if (role === "dean") {
//           shouldAddForm = form.faculty.department === faculty.department;
//         } else if (role === "Committee Convener") {
//           shouldAddForm = form.faculty.department === faculty.department;
//         } else if (role === "HR" || role === "Rector" || role === "Pro-Rector (A)" || role === "Pro-Rector (A&F)" || role === "Director Facilitation" || role === "Account Section" || role === "IT Manager" || role === "Transportation Manager" || role === "Security Manager" || role === "Incharge of Guest House" || role === "Secretary of Faculty Club") {
//           shouldAddForm = true;
//         }

//         // Add any additional role-based filters here

//         if (shouldAddForm && isCurrentApprover && !isFormReviewed) {
//           pendingForms.push(form);
//         }
//       });
//     }

//     res.json(pendingForms);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/facultyForms", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    const pendingForms = [];

    for (const externalRole of faculty.externalRoles) {
      const role = externalRole.role;

      const forms = await Form.find({
        "approvers.role": role,
        $or: [
          { department: externalRole.externalfaculty },
          { "approvers.role": { $in: ["HR", "Rector"] } },
        ],
      }).populate({ path: "faculty", model: "faculty" });

      for (const form of forms) {
        const approverIndex = form.approvers.findIndex(
          (approver) => approver.role === role
        );

        if (form.image) {
          const getObjectParams = {
            Bucket: aws_Bucket_Name,
            Key: form.image,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          form.image = url;
        }

        const isCurrentApprover = approverIndex === 0 || form.approvers[approverIndex - 1].approved;
        const isFormReviewed = form.approvers[approverIndex].approved || form.approvers[approverIndex].disapproved;

        let shouldAddForm = true;

        if (role === "dean") {
          shouldAddForm = form.faculty.department === faculty.department;
        } else if (role === "Committee Convener") {
          shouldAddForm = form.faculty.department === faculty.department;
        } else if (role === "HR" || role === "Rector" || role === "Pro-Rector (A)" || role === "Pro-Rector (A&F)" || role === "Director Facilitation" || role === "Account Section" || role === "IT Manager" || role === "Transportation Manager" || role === "Security Manager" || role === "Incharge of Guest House" || role === "Secretary of Faculty Club") {
          shouldAddForm = true;
        }

        if (shouldAddForm && isCurrentApprover && !isFormReviewed) {
          pendingForms.push(form);
        }
      }
    }

    res.json(pendingForms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});



// @route GET api/faculty/facultyForms/approvedOrDisapproved
// @desc Get all the forms approved or disapproved by the faculty members
// @access Private

// router.get("/facultyForms/approvedOrDisapproved", auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const approvedOrDisapprovedForms = [];

//     for (const externalRole of faculty.externalRoles) {
//       const role = externalRole.role;

//       const forms = await Form.find({
//         "approvers.role": role,
//         $or: [
//           { department: externalRole.externalfaculty },
//           { "approvers.role": { $in: ["HR", "Rector"] } },
//         ],
//       }).populate({ path: "faculty", model: "faculty" });

//       forms.forEach((form) => {
//         const approverIndex = form.approvers.findIndex(
//           (approver) => approver.role === role
//         );

//         // Check if the form is approved or disapproved by the current faculty member
//         if (
//           form.approvers[approverIndex].approved ||
//           form.approvers[approverIndex].disapproved
//         ) {
//           approvedOrDisapprovedForms.push(form);
//         }
//       });
//     }

//     res.json(approvedOrDisapprovedForms);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });


router.get("/facultyForms/approvedOrDisapproved", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    const approvedOrDisapprovedForms = [];

    for (const externalRole of faculty.externalRoles) {
      const role = externalRole.role;

      const forms = await Form.find({
        "approvers.role": role,
        $or: [
          { department: externalRole.externalfaculty },
          { "approvers.role": { $in: ["HR", "Rector"] } },
        ],
      }).populate({ path: "faculty", model: "faculty" });

      for (const form of forms) {
        const approverIndex = form.approvers.findIndex(
          (approver) => approver.role === role
        );

        if (form.image) {
          const getObjectParams = {
            Bucket: aws_Bucket_Name,
            Key: form.image,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          form.image = url;
        }

        // Check if the form is approved or disapproved by the current faculty member
        if (
          form.approvers[approverIndex].approved ||
          form.approvers[approverIndex].disapproved
        ) {
          approvedOrDisapprovedForms.push(form);
        }
      }
    }

    res.json(approvedOrDisapprovedForms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});



//--------------------------------------------Approval Function For Student--------------------------------------------------------------
const sendApprovalEmail = async (studentEmail, formName, studentName, approverRole) => {
  const mailOptions = {
    from: 'abdullah.mohammad2019274@gmail.com', // Your email address
    to: studentEmail,
    subject: 'Form Approval Update',
    text: `Dear ${studentName},\n` +
          `Your ${formName} has been approved by the ${approverRole}.\n` +
          `Please log in to the system to check the status of your form.\n` +
          `Thank you`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Approval email sent to ${studentEmail}`);
  } catch (error) {
    console.error(`Failed to send approval email: ${error.message}`);
  }
};


// @route PUT api/faculty/studentForms/:id
// @desc Approved the form according to hirerchcy
// @access Private

router.put("/studentForms/:id", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    // const formId = req.params.id;
    const formId = req.params.id.trim();
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    const student = await Student.findById(form.student);

    const approverOrderMap = new Map();
    form.approvers.forEach((approver) => {
      approverOrderMap.set(approver.role, approver.order);
    });

    let approverOrder = null;

    faculty.externalRoles.forEach((externalRole) => {
      if (approverOrderMap.has(externalRole.role)) {
        approverOrder = approverOrderMap.get(externalRole.role);
      }
    });

    if (!approverOrder) {
      return res.status(401).json({ msg: "Unauthorized to update this form" });
    }

    const approverIndex = form.approvers.findIndex(
      (approver) => approver.order === approverOrder
    );

    if (approverIndex === -1) {
      return res.status(401).json({ msg: "Unauthorized to update this form" });
    }

    // Check if the previous approver has approved the form
    if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
      return res
        .status(403)
        .json({
          msg: "Previous approver must approve before you can approve the form",
        });
    }

    const approver = form.approvers[approverIndex];

    if (!approver.approved) {
      form.approvers[approverIndex].approved = true;
      await form.save();
      res.json({ msg: `Approval updated for ${approver.role}` });

      await sendApprovalEmail(
        student.email,
        form.formName,
        `${student.firstname} ${student.lastname}`,
        approver.role
      );
    } else {
      res.status(400).json({ msg: "Form already approved" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

//--------------------------------------------Approval Function For Faculty --------------------------------------------------------------

const sendApprovalEmailFaculty = async (facultyEmail, formName, facultyName, approverRole) => {
  const mailOptions = {
    from: 'abdullah.mohammad2019274@gmail.com', // Your email address
    to: facultyEmail,
    subject: 'Form Approval Update',
    text: `Dear ${facultyName},\n` +
          `Your ${formName} has been approved by the ${approverRole}.\n` +
          `Please log in to the system to check the status of your form.\n` +
          `Thank you`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Approval email sent to ${facultyEmail}`);
  } catch (error) {
    console.error(`Failed to send approval email: ${error.message}`);
  }
};

// @route PUT api/faculty/facultyForms/:id
// @desc Approved the form according to hierarchy
// @access Private

router.put("/facultyForms/:id", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    const formId = req.params.id.trim();
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    const formFaculty = await Faculty.findById(form.faculty);

    const approverOrderMap = new Map();
    form.approvers.forEach((approver) => {
      approverOrderMap.set(approver.role, approver.order);
    });

    let approverOrder = null;

    faculty.externalRoles.forEach((externalRole) => {
      if (approverOrderMap.has(externalRole.role)) {
        approverOrder = approverOrderMap.get(externalRole.role);
      }
    });

    if (!approverOrder) {
      return res.status(401).json({ msg: "Unauthorized to update this form" });
    }

    const approverIndex = form.approvers.findIndex(
      (approver) => approver.order === approverOrder
    );

    if (approverIndex === -1) {
      return res.status(401).json({ msg: "Unauthorized to update this form" });
    }

    if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
      return res
        .status(403)
        .json({
          msg: "Previous approver must approve before you can approve the form",
        });
    }

    const approver = form.approvers[approverIndex];

    if (!approver.approved) {
      form.approvers[approverIndex].approved = true;
      await form.save();
      res.json({ msg: `Approval updated for ${approver.role}` });

      await sendApprovalEmailFaculty(
        formFaculty.email,
        form.formName,
        `${formFaculty.firstname} ${formFaculty.lastname}`,
        approver.role
      );
    } else {
      res.status(400).json({ msg: "Form already approved" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


//--------------------------------------------Disapproval Function For Student--------------------------------------------------------------

const sendDisapprovalEmail = async (studentEmail, formName, studentName, approverRole) => {
  const mailOptions = {
    from: 'abdullah.mohammad2019274@gmail.com', // Your email address
    to: studentEmail,
    subject: 'Form Disapproval Update',
    text: `Dear ${studentName},\n\n` +
          `Your ${formName} has been disapproved by the ${approverRole}.\n` +
          `Please visit the office during visiting hours to discuss the issue and any necessary corrections.\n` +
          `After making the required changes, you may resubmit the form for approval.\n` +
          `Thank you`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Disapproval email sent to ${studentEmail}`);
  } catch (error) {
    console.error(`Failed to send disapproval email: ${error.message}`);
  }
};


// @route PUT api/faculty/studentForms/disapprove/:id
// @desc disapproved the form according to hirerchcy
// @access Private

router.put("/studentForms/disapprove/:id", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    // const formId = req.params.id;
    const formId = req.params.id.trim();
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    const approverOrderMap = new Map();
    form.approvers.forEach((approver) => {
      approverOrderMap.set(approver.role, approver.order);
    });

    let approverOrder = null;

    faculty.externalRoles.forEach((externalRole) => {
      if (approverOrderMap.has(externalRole.role)) {
        approverOrder = approverOrderMap.get(externalRole.role);
      }
    });

    if (!approverOrder) {
      return res.status(401).json({ msg: "Unauthorized to update this form" });
    }

    const approverIndex = form.approvers.findIndex(
      (approver) => approver.order === approverOrder
    );

    if (approverIndex === -1) {
      return res.status(401).json({ msg: "Unauthorized to update this form" });
    }

    const approver = form.approvers[approverIndex];

    if (!approver.disapproved) {
      form.approvers[approverIndex].disapproved = true;
      form.approvers[approverIndex].approved = false; // Make sure the form is marked as not approved
      await form.save();
      res.json({ msg: `Disapproval updated for ${approver.role}` });

      // Fetch the student object using form.student
      const student = await Student.findById(form.student);

      await sendDisapprovalEmail(
        student.email,
        form.formName,
        `${student.firstname} ${student.lastname}`,
        approver.role
      );
    } else {
      res.status(400).json({ msg: "Form already disapproved" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});

//--------------------------------------------Disapproval Function For Faculty--------------------------------------------------------------
const sendDisapprovalEmailFaculty = async (facultyEmail, formName, facultyName, approverRole) => {
  const mailOptions = {
    from: 'abdullah.mohammad2019274@gmail.com', // Your email address
    to: facultyEmail,
    subject: 'Form Disapproval Update',
    text: `Dear ${facultyName},\n\n` +
          `We regret to inform you that your ${formName} has been disapproved by the ${approverRole}.\n` +
          `To address the concerns raised and discuss any necessary revisions, kindly schedule a meeting with the ${approverRole} at your earliest convenience.\n` +
          `After incorporating the required changes, please resubmit the form for approval.\n` +
          `We appreciate your understanding and cooperation.\n\n` +
          `Best regards,`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Disapproval email sent to ${facultyEmail}`);
  } catch (error) {
    console.error(`Failed to send disapproval email: ${error.message}`);
  }
};


// @route PUT api/faculty/facultyForms/disapprove/:id
// @desc Disapproved the form according to hierarchy
// @access Private

router.put("/facultyForms/disapprove/:id", auth, async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.faculty.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty not found" });
    }

    const formId = req.params.id.trim();
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ msg: "Form not found" });
    }

    const approverOrderMap = new Map();
    form.approvers.forEach((approver) => {
      approverOrderMap.set(approver.role, approver.order);
    });

    let approverOrder = null;

    faculty.externalRoles.forEach((externalRole) => {
      if (approverOrderMap.has(externalRole.role)) {
        approverOrder = approverOrderMap.get(externalRole.role);
      }
    });

    if (!approverOrder) {
      return res.status(401).json({ msg: "Unauthorized to update this form" });
    }

    const approverIndex = form.approvers.findIndex(
      (approver) => approver.order === approverOrder
    );

    if (approverIndex === -1) {
      return res.status(401).json({ msg: "Unauthorized to update this form" });
    }

    const approver = form.approvers[approverIndex];

    if (!approver.disapproved) {
      form.approvers[approverIndex].disapproved = true;
      form.approvers[approverIndex].approved = false; // Make sure the form is marked as not approved
      await form.save();
      res.json({ msg: `Disapproval updated for ${approver.role}` });

      const formFaculty = await Faculty.findById(form.faculty);

      await sendDisapprovalEmailFaculty(
        formFaculty.email,
        form.formName,
        `${formFaculty.firstname} ${formFaculty.lastname}`,
        approver.role
      );
    } else {
      res.status(400).json({ msg: "Form already disapproved" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server Error: ${error.message}`);
  }
});


// ---------------------------Faculty Dashboard Apis---------------------------------

// @route   GET api/faculty/submittedforms
// @desc    Get all submitted forms of faculty
// @access  Private

router.get("/submittedforms", auth , async (req, res) => {
  try {
    const form = await Form.find({ faculty: req.faculty.id}).count();
    res.json({"submittedFormValue": form});
  }catch(error){
      console.error(error.message);
      res.status(500).send(`Server Error: ${error.message}`);
  }
});

// @route   GET api/faculty/approvedforms
// @desc    Get the count of approved forms for a faculty
// @access  Private

router.get("/approvedforms", auth, async (req, res) => {
try {
  const facultyId = req.faculty.id;
  const forms = await Form.find({ faculty: facultyId });

  const approvedForms = forms.filter(form => {
    return form.approvers.every(approver => approver.approved);
  });

  res.json({ "approvedFormCount": approvedForms.length });
} catch (error) {
  console.error(error.message);
  res.status(500).send(`Server Error: ${error.message}`);
}
});


// @route   GET api/faculty/disapprovedforms
// @desc    Get the count of disapproved forms for a faculty
// @access  Private

router.get("/disapprovedforms", auth, async (req, res) => {
try {
  const facultyId = req.faculty.id;
  const forms = await Form.find({ faculty: facultyId });

  const disapprovedForms = forms.filter(form => {
    return form.approvers.some(approver => approver.disapproved);
  });

  res.json({ "disapprovedFormCount": disapprovedForms.length });
} catch (error) {
  console.error(error.message);
  res.status(500).send(`Server Error: ${error.message}`);
}
});



// @route   GET api/faculty/pendingforms
// @desc    Get the count of pending forms for a faculty
// @access  Private

router.get("/pendingforms", auth, async (req, res) => {
try {
  const facultyId = req.faculty.id;
  const forms = await Form.find({ student: facultyId });

  const pendingForms = forms.filter(form => {
    let isPending = false;
    for (let i = 0; i < form.approvers.length; i++) {
      if (!form.approvers[i].approved) {
        isPending = true;
        break;
      }
    }
    return isPending;
  });

  res.json({ "pendingFormCount": pendingForms.length });
} catch (error) {
  console.error(error.message);
  res.status(500).send(`Server Error: ${error.message}`);
}
});




module.exports = router;

// router.get('/studentForms', auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }
//     const externalRole = faculty.externalRoles[0].role;
//     const numberOfApprovals = faculty.externalRoles.length;
//     const matchedForms = {
//       advisor: [],
//       dean: [],
//     };

//     for (let i = 0; i < numberOfApprovals; i++) {
//       const role = faculty.externalRoles[i].role;
//       if (role === 'advisor' || role === 'dean') {
//         const forms = await Form.find({ 'approvers.role': role, 'faculty': faculty.externalRoles[i].externalfaculty }).populate('student');
//         forms.forEach((form) => {
//           const approverIndex = form.approvers.findIndex(approver => approver.role === role);
          
//           if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
//             // Skip the form if the previous approver hasn't approved it yet
//             return;
//           }

//           if (role === 'advisor') {
//             // Filter forms where the advisor's batch matches the student's batch
//             if (form.student.batch == faculty.externalRoles[i].batch) {
//               matchedForms.advisor.push(form);
//             }
//           } else if (role === 'dean') {
//             if(form.student.faculty === faculty.department ){
//               matchedForms.dean.push(form);
//             }
//           }
//         });
//       }
//     }

//     res.json(matchedForms[externalRole]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });




// router.put('/studentForms/:id', auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }
    
//       const formId = req.params.id;
//       const form = await Form.findById(formId);
//         if (!form) {
//           return res.status(404).json({ msg: "Form not found" });
//         }
//          // Fetch the student object using form.student
//         const student = await Student.findById(form.student);
//         let approverOrder = null;
    
//         faculty.externalRoles.forEach(externalRole => {
//           if (externalRole.role === 'advisor') {
//             approverOrder = 1;
//           } else if (externalRole.role === 'dean') {
//             approverOrder = 2;
//           }
//         });
    
//         if (!approverOrder) {
//           return res.status(401).json({ msg: "Unauthorized to update this form" });
//         }
    
//         const approverIndex = form.approvers.findIndex(approver => approver.order === approverOrder);
    
//         if (approverIndex === -1) {
//           return res.status(401).json({ msg: "Unauthorized to update this form" });
//         }
    
//         // Check if the previous approver has approved the form
//         if (approverIndex > 0 && !form.approvers[approverIndex - 1].approved) {
//           return res.status(403).json({ msg: "Previous approver must approve before you can approve the form" });
//         }
    
//         const approver = form.approvers[approverIndex];
    
//         if (!approver.approved) {
//           form.approvers[approverIndex].approved = true;
//           await form.save();
//           res.json({ msg: `Approval updated for ${approver.role}` });
        
//           await sendApprovalEmail(student.email, form.formName, `${student.firstname} ${student.lastname}`, approver.role);
        
//         } else {
//           res.status(400).json({ msg: "Form already approved" });
//         }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });



// router.put('/studentForms/disapprove/:id', auth, async (req, res) => {
//   try {
//     const faculty = await Faculty.findById(req.faculty.id);
//     if (!faculty) {
//       return res.status(404).json({ msg: "Faculty not found" });
//     }

//     const formId = req.params.id;
//     const form = await Form.findById(formId);
//     if (!form) {
//       return res.status(404).json({ msg: "Form not found" });
//     }

//     let approverOrder = null;

//     faculty.externalRoles.forEach(externalRole => {
//       if (externalRole.role === 'advisor') {
//         approverOrder = 1;
//       } else if (externalRole.role === 'dean') {
//         approverOrder = 2;
//       }
//     });

//     if (!approverOrder) {
//       return res.status(401).json({ msg: "Unauthorized to update this form" });
//     }

//     const approverIndex = form.approvers.findIndex(approver => approver.order === approverOrder);

//     if (approverIndex === -1) {
//       return res.status(401).json({ msg: "Unauthorized to update this form" });
//     }

//     const approver = form.approvers[approverIndex];

//     if (!approver.disapproved) {
//       form.approvers[approverIndex].disapproved = true;
//       form.approvers[approverIndex].approved = false; // Make sure the form is marked as not approved
//       await form.save();
//       res.json({ msg: `Disapproval updated for ${approver.role}` });

      
//     } else {
//       res.status(400).json({ msg: "Form already disapproved" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send(`Server Error: ${error.message}`);
//   }
// });



