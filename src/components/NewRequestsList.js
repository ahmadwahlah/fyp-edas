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
        const updatedRequests = newRequests.filter(
          (request) => request._id !== id
        );
        console.log("Updated requests:", updatedRequests);
        setNewRequests(updatedRequests);
        setFilteredRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error approving request:", error);
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
        const updatedRequests = newRequests.filter(
          (request) => request._id !== id
        );
        console.log("Updated requests:", updatedRequests);
        setNewRequests(updatedRequests);
        setFilteredRequests(updatedRequests);
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
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
                        {newRequest.firstname} {newRequest.lastname} (
                        {newRequest.role === "faculty"
                          ? newRequest.subrole.toUpperCase()
                          : newRequest.role.toUpperCase()}
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
                        {`${newRequest.email}`}
                      </Typography>
                    </Box>
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
                    handleDisapprove(newRequest._id, newRequest.role)
                  }
                >
                  <CancelIcon style={{ color: "red" }} fontSize="large" />
                </IconButton>
              </ListItem>
            </div>
          </Box>
        ))}
      </List>
    </>
  );
};

export default NewRequestsList;
