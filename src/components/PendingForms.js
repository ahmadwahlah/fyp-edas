import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { HourglassEmpty } from "@mui/icons-material";
import moment from "moment";
import axios from "axios";

const DividerLine = () => <Divider style={{ marginBottom: "8px" }} />;

const PendingForms = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "x-auth-token": token,
        },
      };
      const response = await axios.get(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/faculty/studentForms",
        config
      );

      console.log(response.data);
      console.log(response.data[0].student.role);
      setForms(response.data);
      // Assuming the data structure is similar to pendingForms, you can set the state with the fetched data
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleFormClick = (form) => {
    setSelectedForm(form);
  };

  const handleApprove = () => {
    // Remove the approved form from the list
    const updatedForms = forms.filter((form) => form.id !== selectedForm.id);
    setForms(updatedForms);
    setSelectedForm(null);
  };

  const handleDisapprove = () => {
    // Remove the disapproved form from the list
    const updatedForms = forms.filter((form) => form.id !== selectedForm.id);
    setForms(updatedForms);
    setSelectedForm(null);
  };

  return (
    <div>
      <Box style={{ width: "100%" }}>
        <List>
          {forms.map((form, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: ".5rem",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
                margin: "1.5rem",
                padding: ".5rem",
                backgroundColor: "#f5f5f5",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.01)",
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "#e5e5e5",
                },
              }}
            >
              <div
                key={form.id}
                onClick={() => handleFormClick(form)}
                style={{ cursor: "pointer" }}
              >
                <ListItem alignItems="flex-start" style={{ padding: ".5rem" }}>
                  <ListItemText
                    primary={
                      <Box
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            width: "35%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{
                              fontFamily: "Arial, sans-serif",
                              fontWeight: "bold",
                              color: "black",
                              textTransform: "uppercase",
                            }}
                          >
                            {form.formName}
                          </Typography>{" "}
                          <Typography
                            variant="subtitle1"
                            style={{
                              flex: 1,
                              fontFamily: "Arial, sans-serif",
                              fontWeight: "bold",
                              color: "black",
                            }}
                          >
                            {`${form.student.firstname} ${form.student.lastname} (${form.student.role})`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            borderRadius: "4px",
                            width: "40%",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{
                              flex: 1,
                              fontFamily: "Arial, sans-serif",
                              color: "black",
                              fontWeight: "bold",
                              fontStyle: "italic",
                            }}
                          >
                            {`Submission Date: ${moment(form.date).format(
                              "DD-MM-YYYY"
                            )}`}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              flex: 1,
                              fontFamily: "Arial, sans-serif",
                              color: "black",
                              fontWeight: "bold",
                              fontStyle: "italic",
                            }}
                          >
                            {`Submission Time: ${moment(form.date).format(
                              "HH:mm:ss"
                            )}`}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "6rem",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span style={{ color: "darkorange" }}>
                              {<HourglassEmpty />}
                            </span>
                            <Typography
                              variant="body2"
                              sx={{ color: "darkorange", fontWeight: "bold" }}
                            >
                              Pending
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </div>
            </Box>
          ))}
        </List>
      </Box>
      <Dialog
        open={Boolean(selectedForm)}
        onClose={() => setSelectedForm(null)}
        sx={{ Width: "5rem" }}
      >
        <DialogTitle>
          <Typography variant="h6" color="primary">
            {selectedForm?.formName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                <strong>Name: </strong>
                {selectedForm?.student.firstname}{" "}
                {selectedForm?.student.lastname}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Role: </strong>
                {selectedForm?.student.role}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Batch Number: </strong>
                {selectedForm?.student.batch}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Reg Number: </strong>
                {selectedForm?.student.regnum}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Faculty: </strong>
                {selectedForm?.student.faculty}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Email: </strong>
                {selectedForm?.student.email}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Phone Number: </strong>
                {selectedForm?.student.phoneNumber}
              </Typography>
            </Box>
            <DividerLine />
            <Box sx={{ mb: 2 }}>
              {selectedForm?.responces.combinedArray.map((item) => (
                <Typography key={item.id} variant="subtitle1">
                  <strong>{item.heading}: </strong>
                  {item.values ? item.values.join(", ") : item.value}
                </Typography>
              ))}
            </Box>
            <DividerLine />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisapprove} variant="text" color="error">
            Disapprove
          </Button>
          <Button
            onClick={handleApprove}
            variant="contained"
            color="success"
            autoFocus
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PendingForms;
