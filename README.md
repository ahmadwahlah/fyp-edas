# EDAS: Electronic Document and Approval System

Welcome to the EDAS project—a cutting-edge Electronic Document and Approval System that revolutionizes document management. This digital platform seamlessly digitizes and integrates approval workflows, enabling users to effortlessly track form progress through email notifications and an intuitive dashboard interface. Users can conveniently design forms, and define approval hierarchies, eliminating the need for traditional, time-consuming methods and fostering a more productive online environment.

## Key Features

- **Email Notifications and Form Tracking**
  - *Timely Updates:* Users receive prompt email notifications about form submission status.
  - *User-Friendly Tracking:* Effortlessly monitor form progress through an intuitive dashboard.

- **User-Centric Roles and Permissions**
  - *Secure Access:* The web-based interface ensures separate and secure login credentials for each user, enhancing individualized system access.
  - *Role-Based Permissions:* Tailored roles for students, faculty/admin members, and system administrators.

- **Dashboard Analytics**
  - *System Optimization:* Gain analytics for performance optimization.
  - *Identify Trends:* Pinpoint delays, bottlenecks, and trends in the approval process.

- **Streamlined Workflow Design**
  - *Custom Forms:* Faculty/Admin members can design and create custom forms for adaptability.
  - *Approval Hierarchies:* Define dynamic approval workflows, reducing reliance on traditional methods.

## Technologies Used

The EDAS project is built using a stack of modern and reliable technologies to deliver a seamless and efficient document management experience. The key technologies employed in this project include:

- **Frontend:**
  - [React.js](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [Material-UI](https://material-ui.com/): A React UI framework implementing Google's Material Design.

- **Backend:**
  - [Node.js](https://nodejs.org/): A JavaScript runtime for server-side development.
  - [Express.js](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
  - [JWT (JSON Web Token)](https://jwt.io/): A compact, URL-safe means of representing claims to be transferred between two parties.

- **Database:**
  - [MongoDB](https://www.mongodb.com/): A NoSQL database for flexible and scalable data storage.

- **Email Notifications:**
  - [Node Mailer](https://nodemailer.com/): A module for Node.js to send emails.

- **Authentication and Authorization:**
  - [JWT Token](https://jwt.io/): Used for secure user authentication and authorization.

- **Cloud Storage:**
  - [Amazon S3](https://aws.amazon.com/s3/): Scalable object storage in the cloud.

- **Server Deployment and Management:**
  - [Amazon EC2](https://aws.amazon.com/ec2/): Virtual servers in the cloud.
  - [PM2](https://pm2.keymetrics.io/): Advanced, production process manager for Node.js.
  - [Nginx](https://www.nginx.com/): A high-performance web server and reverse proxy server.

These technologies work together to provide a robust, secure, and scalable solution for document management and approval workflows in the EDAS system.

## Screenshots

![Signin](/screenshots/signin.png)
***Sign In Page***

##
![Signup](/screenshots/signup.png)
***Sign Up Page***

##
![Password](/screenshots/password.png)
***Forgot Password Page***

##
![studentDashboard](/screenshots/student-dashboard.png)
***Student Dashboard***

##
![studentForms](/screenshots/student-forms.png)
***Student Forms List***

##
![formSubmission](/screenshots/student-form-submission.png)
***Student Form Submission***

##
![formProgress](/screenshots/student-form-progress.png)
***Student Form Progress View***

##
![profile](/screenshots/update-profile.png)
***Update Profile***

##
![facultyDashboard](/screenshots/faculty-dashboard.png)
***Faculty/Staff Dashboard***

##
![pendingForms](/screenshots/faculty-pending-forms.png)
***Faculty/Staff Pending Forms Page***

##
![facultyApproval](/screenshots/faculty-approval:disapproval.png)
***Faculty/Staff Form Approval/Disapproval Page***

##
![administratorDashboard](/screenshots/administrator-dashboard.png)
***System Administrator Dashboard***

##
![userManagement](/screenshots/administrator-usermanagement.png)
***System Administrator User Management; New Requests Page***

##
![currentUser](/screenshots/administrator-currentuser.png)
***System Administrator User Management; Current Users Page***

##
![deleteUser](/screenshots/user-delete.png)
***System Administrator User Delete Confirmation***

##
![formlist](/screenshots/administrator-formlist.png)
***System Administrator Forms List Page***

##
![userUpdatePage](/screenshots/administrator-userupdate.png)
***System Administrator User Credentials Update Page***

##
![formbuilder](/screenshots/form-builder.png)
***System Administrator Dynamic Form Builder Page***

##
![formBuilder2](/screenshots/form-builder-2.png)
***System Administrator Dynamic Form Builder Cont'd***

##
![formView](/screenshots/form-view.png)
***System Administrator Form View Page***


## Installation and Usage

To install and use the Electronic Document and Approval System, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: npm install.
4. Start the development server: npm start.
5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the EDAS application.

## Contribution Guidelines

We welcome contributions to enhance and improve the Electronic Document and Approval System. To contribute, follow these guidelines:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/new-feature`
5. Create a pull request.

Thank you for considering contributing to our project!

## License

This project is licensed under the MIT License.
