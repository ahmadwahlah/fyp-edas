import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchBar from "./SearchBar";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Users = [
  {
    name: "Bob Johnson",
    image: "https://via.placeholder.com/150",
    email: "bob.johnson@example.com",
  },
  {
    name: "Alice Thompson",
    image: "https://via.placeholder.com/150",
    email: "alice.thompson@example.com",
  },
  {
    name: "John Doe",
    image: "https://via.placeholder.com/150",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    image: "https://via.placeholder.com/150",
    email: "jane.smith@example.com",
  },
  // Add more users as needed
];

const CurrentUsersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(Users);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = Users.filter((user) =>
      user.name.trim().replace(/\s/g, " ").toLowerCase().includes(value)
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
          justifyContent: "space-around",
          margin: "2rem",
        }}
      >
        <Box
          sx={{
            width: "30%",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "black",
              textTransform: "uppercase",
              letterSpacing: 1,
              mr: 2,
            }}
          >
            Search Users
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <SearchBar sx={{ ml: 2 }} value={searchQuery} func={handleSearch} />
        </Box>
      </Box>
      <Divider />
      <List>
        {filteredUsers.map((user, index) => (
          <div key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.image} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </div>
        ))}
      </List>
    </>
  );
};

export default CurrentUsersList;
