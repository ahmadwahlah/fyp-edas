import { useState } from "react";
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

const DividerLine = () => <Divider style={{ marginBottom: "8px" }} />;

const pendingForms = [
  {
    id: 1,
    formName: "Student Enrollment",
    submissionDate: "2022-09-01",
    submissionTime: "09:30:00",
    submittedBy: { name: "John Smith", role: "Student" },
    department: "Admissions",
    email: "john.smith@example.com",
  },
  {
    id: 2,
    formName: "Faculty Leave Request",
    submissionDate: "2022-08-15",
    submissionTime: "02:15:00",
    submittedBy: { name: "Emily Jones", role: "Faculty" },
    department: "Human Resources",
    email: "emily.jones@example.com",
  },
  {
    id: 3,
    formName: "IT Helpdesk Ticket",
    submissionDate: "2022-07-22",
    submissionTime: "10:45:00",
    submittedBy: { name: "Michael Lee", role: "Staff" },
    department: "Information Technology",
    email: "michael.lee@example.com",
  },
];

const PendingForms = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [forms, setForms] = useState(pendingForms);

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
          {forms.map((form) => (
            <Box
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
                            {`${form.submittedBy.name} (${form.submittedBy.role})`}
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
                            {`Submission Date: ${moment(
                              form.submissionDate
                            ).format("DD-MM-YYYY")}`}
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
                            {`Submission Time: ${moment(
                              form.submissionTime,
                              "HH:mm:ss"
                            ).format("hh:mm:ss")}`}
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
                <strong>Form Name:</strong> {selectedForm?.formName}
              </Typography>
            </Box>
            <DividerLine />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                <strong>Submission Date:</strong>{" "}
                {`${selectedForm?.submissionDate} ${selectedForm?.submissionTime}`}
              </Typography>
            </Box>
            <DividerLine />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                <strong>Submitted By:</strong>{" "}
                {`${selectedForm?.submittedBy?.name} (${selectedForm?.submittedBy?.role})`}
              </Typography>
            </Box>
            <DividerLine />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">
                <strong>Department:</strong> {selectedForm?.department}
              </Typography>
            </Box>
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
