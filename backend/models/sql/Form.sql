CREATE TABLE Form (
  id INT NOT NULL,
  studentregnum VARCHAR(20) NOT NULL,
  type VARCHAR(50) NOT NULL,
  approval JSON NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(studentregnum) REFERENCES Student(regnum)  -- registration number (regnum) is the foreign key for the form table
);

-- Dummy data
-- {
--   "id":1 ,
--   "firstname":"Muhammad Abdullah",
--   "lastname":"Habib", 
--   "email":"u2019274@giki.edu.pk",
--   "password":"Pelikan123",
--   "phoneNumber":"03044555991",
--   "regnum":"2019274",                
--   "faculty":"Computer Science",
--   "batch":29, 
--   "approvedByAdmin":true
-- }