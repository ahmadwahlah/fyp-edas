import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchBar from "./SearchBar";
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
            Search Requests
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
