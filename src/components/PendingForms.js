import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const newRequests = [
  {
    id: 1,
    name: "Bob Johnson",
    image: "https://via.placeholder.com/150",
    email: "bob.johnson@example.com",
    formName: "Expense Report",
    department: "Finance",
    date: "2023-02-25",
    time: "13:45",
  },
  {
    id: 2,
    name: "Alice Thompson",
    image: "https://via.placeholder.com/150",
    email: "alice.thompson@example.com",
    formName: "Leave Request",
    department: "HR",
    date: "2023-03-02",
    time: "10:30",
  },
]; // Add more users as needed

const PendingForms = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [forms, setForms] = useState(newRequests);

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
      <List>
        {forms.map((form) => (
          <div key={form.id} onClick={() => handleFormClick(form)}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={form.name} src={form.image} />
              </ListItemAvatar>
              <ListItemText
                primary={form.formName}
                secondary={
                  <div>
                    <div>{form.name}</div>
                    <div>{form.department}</div>
                    <div>
                      {form.date}, {form.time}
                    </div>
                    <div>{form.email}</div>
                  </div>
                }
              />
            </ListItem>
          </div>
        ))}
      </List>
      <Dialog
        open={selectedForm !== null}
        onClose={() => setSelectedForm(null)}
      >
        <DialogTitle>{selectedForm?.formName}</DialogTitle>
        <DialogContent>
          <div>{selectedForm?.name}</div>
          <div>{selectedForm?.department}</div>
          <div>
            {selectedForm?.date}, {selectedForm?.time}
          </div>
          <div>{selectedForm?.email}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisapprove} color="error">
            Disapprove
          </Button>
          <Button onClick={handleApprove} color="success" autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PendingForms;
