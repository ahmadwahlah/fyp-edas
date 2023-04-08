import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CourseAutocomplete = ({
  courses,
  selectedCourses,
  setSelectedCourses,
}) => {
  return (
    <Autocomplete
      multiple
      options={courses}
      getOptionLabel={(option) => `${option.courseNo} - ${option.title}`}
      value={selectedCourses}
      onChange={(event, newValue) => {
        setSelectedCourses(newValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Select Courses" fullWidth />
      )}
    />
  );
};

export default CourseAutocomplete;
