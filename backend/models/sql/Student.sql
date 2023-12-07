CREATE TABLE Student (
  id INT AUTO_INCREMENT UNIQUE,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(20),
  regnum VARCHAR(20) PRIMARY KEY,                        -- registration number (regnum) is the foreign key for the form table
  faculty VARCHAR(50) NOT NULL,
  batch INT NOT NULL,
  approvedByAdmin BOOLEAN DEFAULT FALSE,
);