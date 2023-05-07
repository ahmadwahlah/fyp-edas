import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import UserSearchBar from "./UserSearchBar";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewRequestsList = () => {
  const defaultUsers = [
    {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@example.com",
      role: "student",
    },
    {
      id: 2,
      firstname: "Jane",
      lastname: "Doe",
      email: "janedoe@example.com",
      role: "faculty",
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  //const [newRequests, setNewRequests] = useState(defaultUsers);
  //const [filteredRequests, setFilteredRequests] = useState(defaultUsers);
  const [newRequests, setNewRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("This is a success message!");
  const [severity, setSeverity] = useState("success");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [disapproveUser, setDisapproveUser] = useState({});

  const handleOpenDialog = (id, role) => {
    setDisapproveUser({ id, role });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDisapproveConfirmation = () => {
    handleDisapprove(disapproveUser.id, disapproveUser.role);
    setOpenDialog(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      axios.get(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/student/notapproved",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      ),
      axios.get(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/faculty/notapproved",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      ),
    ])
      .then(([studentResponse, teacherResponse]) => {
        console.log(
          "Received responses:",
          studentResponse.data,
          teacherResponse.data
        );
        const combinedRequests = [
          ...studentResponse.data,
          ...teacherResponse.data,
        ];
        setNewRequests(combinedRequests);
        setFilteredRequests(combinedRequests);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleApprove = (id, role) => {
    console.log(`Approving request with id ${id} ${role}`);
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/${role}/approval/${id}`,
        { accept: true },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(() => {
        console.log("Request approved successfully");
        setMessage("Request approved successfully!");
        setSeverity("success");
        setOpen(true);
        const updatedRequests = newRequests.filter(
          (request) => request._id !== id
        );
        console.log("Updated requests:", updatedRequests);
        setNewRequests(updatedRequests);
        setFilteredRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error approving request:", error);
        setMessage("Error approving request!");
        setSeverity("error");
        setOpen(true);
      });
  };

  const handleDisapprove = (id, role) => {
    console.log(`Disapproving request with id ${id}`);
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/${role}/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(() => {
        console.log("Request deleted successfully");
        setMessage("Request deleted successfully!");
        setSeverity("success");
        setOpen(true);
        const updatedRequests = newRequests.filter(
          (request) => request._id !== id
        );
        console.log("Updated requests:", updatedRequests);
        setNewRequests(updatedRequests);
        setFilteredRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
        setMessage("Error deleting request!");
        setSeverity("error");
        setOpen(true);
      });
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = newRequests.filter((newRequest) =>
      `${newRequest.firstname} ${newRequest.lastname}`
        .trim()
        .replace(/\s/g, " ")
        .toLowerCase()
        .includes(value)
    );
    setFilteredRequests(filtered);
  };

  return (
    <>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        <Typography
          variant="button"
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            color: "#333", // Slightly lighter black for better readability
            width: "21rem",
            fontSize: "1.25rem", // Adjust font size for better visibility
            letterSpacing: "0.5px",
            marginRight: "1.5rem",
          }}
        >
          Total Requests: {filteredRequests.length}
        </Typography>

        <UserSearchBar sx={{ ml: 2 }} value={searchQuery} func={handleSearch} />
      </Box>
      <Divider />
      <List>
        {filteredRequests.map((newRequest, index) => (
          <Box
            key={newRequest._id || index}
            sx={{
              borderRadius: ".5rem",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
              margin: "1rem",
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
            <div>
              <ListItem>
                <ListItemText
                  primary={
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          {newRequest.firstname} {newRequest.lastname} (
                          {newRequest.role === "faculty"
                            ? newRequest.subrole.toUpperCase()
                            : newRequest.role.toUpperCase()}
                          )
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: "Arial, sans-serif",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {newRequest.role === "faculty"
                            ? newRequest.department.toUpperCase()
                            : newRequest.faculty.toUpperCase()}
                        </Typography>
                        {newRequest.role === "student" && (
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontFamily: "Arial, sans-serif",
                              color: "black",
                              fontWeight: "bold",
                            }}
                          >
                            Reg Number: {newRequest.regnum.toUpperCase()}
                          </Typography>
                        )}
                        {newRequest.role === "student" && (
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontFamily: "Arial, sans-serif",
                              color: "black",
                              fontWeight: "bold",
                            }}
                          >
                            Batch Number: {newRequest.batch.toUpperCase()}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: "Arial, sans-serif",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {`${newRequest.email}`}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontFamily: "Arial, sans-serif",
                            color: "black",
                            fontWeight: "bold",
                          }}
                        >
                          {`${newRequest.phoneNumber}`}
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                />
                <IconButton
                  aria-label="approve"
                  onClick={() => handleApprove(newRequest._id, newRequest.role)}
                >
                  <CheckCircleIcon
                    style={{ color: "green" }}
                    fontSize="large"
                  />
                </IconButton>

                <IconButton
                  aria-label="disapprove"
                  onClick={() =>
                    handleOpenDialog(newRequest._id, newRequest.role)
                  }
                >
                  <CancelIcon style={{ color: "red" }} fontSize="large" />
                </IconButton>
              </ListItem>
            </div>
          </Box>
        ))}
      </List>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Disapprove User Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to disapprove this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDisapproveConfirmation}
            color="primary"
            autoFocus
            variant="contained"
          >
            Disapprove
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewRequestsList;
