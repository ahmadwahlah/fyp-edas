import { useState, useEffect } from "react";
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
  const [currentUsers, setCurrentUsers] = useState(defaultUsers);
  const [filteredUsers, setFilteredUsers] = useState(defaultUsers);
  //const [currentUsers, setCurrentUsers] = useState([]);
  //const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("/api/admin/student/approved"),
      axios.get("/api/admin/faculty/approved"),
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
    axios
      .delete(`/api/admin/${role}/${id}`)
      .then(() => {
        console.log("User deleted successfully");
        const updatedUsers = currentUsers.filter((user) => user.id !== id);
        console.log("Updated users:", updatedUsers);
        setCurrentUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
      });
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
        <UserSearchBar sx={{ ml: 2 }} value={searchQuery} func={handleSearch} />
      </Box>
      <Divider />
      <List>
        {filteredUsers.map((currentUser) => (
          <Box
            key={currentUser.id}
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
                        {`${currentUser.firstname} ${
                          currentUser.lastname
                        } (${currentUser.role.toUpperCase()})`}
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
                <IconButton aria-label="edit">
                  <EditIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(currentUser.id, currentUser.role)}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </ListItem>
            </div>
          </Box>
        ))}
      </List>
    </>
  );
};

export default CurrentUsersList;
