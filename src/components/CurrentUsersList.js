import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
  );
};

export default NewRequestsList;
