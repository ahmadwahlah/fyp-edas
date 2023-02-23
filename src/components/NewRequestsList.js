import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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
  return (
    <List>
      {newRequests.map((user, index) => (
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
  );
};

export default NewRequestsList;
