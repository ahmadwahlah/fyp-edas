CREATE TABLE Users (
     RegNo int PRIMARY KEY,
     FirstName varchar(255),
     LastName varchar(255),
     Role varchar(255),
     Dept varchar(255),
     Phone varchar(255),
     Email varchar(255),
     Password varchar(255),
     Accept bool
);

CREATE TABLE Admin (
  id INT NOT NULL ,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  role VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Faculty (
  id INT NOT NULL ,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  regnum VARCHAR(20) NOT NULL,
  role VARCHAR(20) NOT NULL,
  department VARCHAR(50) NOT NULL,
  accept bool,
  PRIMARY KEY (id)
);

CREATE TABLE Student (
  id INT NOT NULL ,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  regnum VARCHAR(20) NOT NULL,
  role VARCHAR(20) NOT NULL,
  faculty VARCHAR(50) NOT NULL,
  batch INT NOT NULL,
  accept bool,
  PRIMARY KEY (id)
);

-- INSERT INTO From (id ,formType,formInitiator) VALUES (1,'Leave From','Student');

CREATE TABLE Form (
  id INT NOT NULL AUTO_INCREMENT,
  formtype VARCHAR(255) NOT NULL,
  formInitiator VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Hierarchy (
  id INT NOT NULL AUTO_INCREMENT,
  form_id INT NOT NULL,
  hierarchy JSON NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (form_id) REFERENCES Form(id)
);

-- SELECT *
-- FROM Form
-- JOIN Hierarchy
-- ON Form.id = Hierarchy.form_id;

CREATE TABLE Form_Progress (
  id INT NOT NULL AUTO_INCREMENT,
  progress_id INT NOT NULL,
  progress JSON NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (progress_id) REFERENCES Hierarchy(id)
);
