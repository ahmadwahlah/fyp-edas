import React, { useState, useEffect } from "react";

import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UserSearchBar from "./UserSearchBar";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const CurrentUsersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  //const [currentUsers, setCurrentUsers] = useState(defaultUsers);
  //const [filteredUsers, setFilteredUsers] = useState(defaultUsers);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
    handleDelete(disapproveUser.id, disapproveUser.role);
    setOpenDialog(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    Promise.all([
      axios.get(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/student/approved",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      ),
      axios.get(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/faculty/approve",
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
        const studentRequests = studentResponse.data;
        const teacherRequests = Array.isArray(teacherResponse.data)
          ? teacherResponse.data
          : [];
        const combinedRequests = [...studentRequests, ...teacherRequests];
        setCurrentUsers(combinedRequests);
        setFilteredUsers(combinedRequests);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (id, role) => {
    console.log(`Deleting users with id ${id}`);
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/admin/${role}/remove/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(() => {
        console.log("User deleted successfully");
        setMessage("User deleted successfully!");
        setSeverity("success");
        setOpen(true);
        const updatedUsers = currentUsers.filter((user) => user._id !== id);
        console.log("Updated users:", updatedUsers);
        setCurrentUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
        setMessage("Error deleting request!");
        setSeverity("error");
        setOpen(true);
      });
  };
  const navigate = useNavigate();

  const handleEdit = (id, role) => {
    // Navigate to the appropriate page based on the user role
    if (role === "faculty") {
      navigate("/editfacultyprofile", {
        state: { userId: id, userRole: role },
      });
    } else if (role === "student") {
      navigate("/editprofile", { state: { userId: id, userRole: role } });
    }
  };
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = currentUsers.filter((currentUser) =>
      `${currentUser.firstname} ${currentUser.lastname}`
        .trim()
        .replace(/\s/g, " ")
        .toLowerCase()
        .includes(value)
    );
    setFilteredUsers(filtered);
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
            width: "17rem",
            fontSize: "1.25rem", // Adjust font size for better visibility
            letterSpacing: "0.5px",
            marginRight: "4.7rem",
          }}
        >
          Total Users: {filteredUsers.length}
        </Typography>

        <UserSearchBar sx={{ ml: 2 }} value={searchQuery} func={handleSearch} />
      </Box>
      <Divider />
      <List>
        {filteredUsers.map((currentUser, index) => (
          <Box
            key={currentUser._id || index}
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
                    <Box>
                      <Typography
                        variant="h6"
                        style={{
                          flex: 1,
                          fontFamily: "Arial, sans-serif",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {currentUser.firstname} {currentUser.lastname} (
                        {currentUser.role === "faculty"
                          ? currentUser.subrole.toUpperCase()
                          : currentUser.role.toUpperCase()}
                        )
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        style={{
                          flex: 1,
                          fontFamily: "Arial, sans-serif",
                          color: "black",
                        }}
                      >
                        {`${currentUser.email}`}
                      </Typography>
                    </Box>
                  }
                />
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEdit(currentUser._id, currentUser.role)}
                >
                  <EditIcon fontSize="large" style={{ color: "#1976d2" }} />
                </IconButton>
                <IconButton
                  aria-label="disapprove"
                  onClick={() =>
                    handleOpenDialog(currentUser._id, currentUser.role)
                  }
                >
                  <DeleteIcon style={{ color: "red" }} fontSize="large" />
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
          {"Delete User Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
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
            Delete
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

export default CurrentUsersList;
