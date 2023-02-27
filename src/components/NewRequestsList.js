import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import UserSearchBar from "./UserSearchBar";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const newRequests = [
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
  // Add more users as needed
];

const NewRequestsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState(newRequests);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = newRequests.filter((newRequests) =>
      newRequests.name.trim().replace(/\s/g, " ").toLowerCase().includes(value)
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
        {filteredRequests.map((user, index) => (
          <div key={index}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.image} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              <IconButton aria-label="approve">
                <CheckCircleIcon style={{ color: "green" }} />
              </IconButton>
              <IconButton aria-label="disapprove">
                <CancelIcon style={{ color: "red" }} />
              </IconButton>
            </ListItem>
          </div>
        ))}
      </List>
    </>
  );
};

export default NewRequestsList;
