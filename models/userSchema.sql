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

-- INSERT INTO Admin (id ,firstname,lastname,email,password,phoneNumber,role)
-- VALUES (1,'Muhammad Abdullah','Habib','u2019274@giki.edu.pk','pelikan123','03044555991','admin');

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
  department VARCHAR(50) NOT NULL,
  accept bool,
  PRIMARY KEY (id)
);