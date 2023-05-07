import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import EditFormDialog from "./EditFormDialog";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: ".25rem",
  marginBottom: "1rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "0.5rem",
  cursor: "pointer",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Added box-shadow
  background: "linear-gradient(135deg, #f5f5f5, #d8d8d8)", // Added gradient background
  fontFamily: "'Helvetica Neue', sans-serif", // Changed font
  transition: "all 0.2s ease-in-out", // Added hover effect
  "&:hover": {
    transform: "scale(1.0075)",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});

export default function AllForms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredForms, setFilteredForms] = useState([]);
  const [forms, setForms] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteForm, setDeleteForm] = useState({});

  const handleOpenDialog = (event, form) => {
    event.preventDefault();
    setDeleteForm(form);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDisapproveConfirmation = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/dynamicforms/${deleteForm.id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      // Remove the deleted form from the local state
      setForms(forms.filter((form) => form.id !== deleteForm.id));
      setFilteredForms(
        filteredForms.filter((form) => form.id !== deleteForm.id)
      );
    } catch (error) {
      console.error("Error deleting form:", error);
    }
    setOpenDialog(false);
  };

  const [openFormDialog, setOpenFormDialog] = useState(false);
  const handleOpenFormDialog = (event, form) => {
    event.preventDefault();
    setFormDialogData(form); // Set the form data for editing
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
  };

  const [formDialogData, setFormDialogData] = useState(null);
  const handleUpdateForm = (updatedForm) => {
    // Implement the logic to update the form data.
    // You may need to make an API call to update the form on the server-side.

    // Close the FormDialog component after updating the form data.
    setOpenFormDialog(false);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);

    const filtered = forms.filter((form) =>
      form.name.trim().replace(/\s/g, " ").toLowerCase().includes(value)
    );
    setFilteredForms(filtered);
  };

  useEffect(() => {
    // Fetch form data from API and update state
    const fetchForms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/dynamicforms",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log(response.data);
        const data = response.data;
        const mappedData = data.map((form) => ({
          id: form._id,
          name: form.formName,
          route: `/allform/${form._id}`,
        }));
        setForms(mappedData);
        setFilteredForms(mappedData);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchForms();
  }, []);

  return (
    <Box sx={{ width: "100%", left: 0, top: 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "black",
            textTransform: "uppercase",
            fontSize: 30,
            letterSpacing: 1,
            mr: 2,
          }}
        >
          Forms
        </Typography>
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
      <Box sx={{ padding: "1rem" }}>
        {filteredForms.map((form, index) => (
          <StyledLink to={form.route} key={form._id || index}>
            <StyledCard>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  height: "12vh",
                  alignItems: "space-between",
                  justifyContent: "space-between",
                  padding: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontWeight: "bold",
                      color: "black",
                      textTransform: "uppercase",
                      textAlign: "center",
                    }}
                  >
                    {form.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <IconButton
                      aria-label="edit"
                      onClick={(event) => handleOpenFormDialog(event, form)}
                    >
                      <EditIcon fontSize="large" style={{ color: "#1976d2" }} />
                    </IconButton> */}

                  <IconButton
                    aria-label="delete"
                    onClick={(event) => handleOpenDialog(event, form)}
                  >
                    <DeleteIcon style={{ color: "red" }} fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
            </StyledCard>
          </StyledLink>
        ))}
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Form Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this form?
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
      <EditFormDialog
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        form={formDialogData}
        onUpdate={handleUpdateForm} // You should create a function to handle form updates
      />
    </Box>
  );
}
