import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableElement from "./DraggableElement";
import FormEditor from "./FormEditor";
import FormPreview from "./FormPreview";
import {
  Box,
  Grid,
  Typography,
  Container,
  Paper,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import LoggedInHeader from "../LoggedInHeader";
import InputFieldDialog from "./Toolbox/InputFieldDialog";
import MultiTextAreaDialog from "./Toolbox/MultiTextAreaDialog";
import RadioButtonDialog from "./Toolbox/RadioButtonDialog";
import CheckboxGroupDialog from "./Toolbox/CheckboxGroupDialog";
import DropdownSelectDialog from "./Toolbox/DropdownSelectDialog";
import DropdownMultiSelectDialog from "./Toolbox/DropdownMultiSelectDialog";
import DatePickerDialog from "./Toolbox/DatePickerDialog";
import TimePickerDialog from "./Toolbox/TimePickerDialog";
import FileUploadDialog from "./Toolbox/FileUploadDialog";

import FormDialog from "./FormDialog";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    paddingBottom: "1rem",
  },
  paper: {
    p: 2,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginBottom: "1rem",
    padding: "1rem",
  },
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormBuilderContainer = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("This is a success message!");
  const [severity, setSeverity] = useState("success");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");
  const [editingField, setEditingField] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentField, setCurrentField] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openMultiTextAreaDialog, setOpenMultiTextAreaDialog] = useState(false);
  const [openRadioButtonDialog, setOpenRadioButtonDialog] = useState(false);
  const [openCheckboxGroupDialog, setOpenCheckboxGroupDialog] = useState(false);
  const [openDropdownSelectDialog, setOpenDropdownSelectDialog] =
    useState(false);
  const [openDropdownMultiSelectDialog, setOpenDropdownMultiSelectDialog] =
    useState(false);
  const [openDatePickerDialog, setOpenDatePickerDialog] = useState(false);
  const [openTimePickerDialog, setOpenTimePickerDialog] = useState(false);
  const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false);

  const onAddField = useCallback((newField, editing = false) => {
    if (editing) {
      setEditingField(newField);
    } else {
      if (newField.type === "inputField") {
        setOpenDialog(true);
        setCurrentField(newField);
      } else if (newField.type === "multiTextArea") {
        setOpenMultiTextAreaDialog(true);
        setCurrentField(newField);
      } else if (newField.type === "radioButton") {
        setOpenRadioButtonDialog(true);
        setCurrentField(newField);
      } else if (newField.type === "checkboxGroup") {
        setOpenCheckboxGroupDialog(true);
        setCurrentField(newField);
      } else if (newField.type === "dropdownSelect") {
        setOpenDropdownSelectDialog(true);
        setCurrentField(newField);
      } else if (newField.type === "dropdownMultiSelect") {
        setOpenDropdownMultiSelectDialog(true);
        setCurrentField(newField);
      } else if (newField.type === "datePicker") {
        setOpenDatePickerDialog(true);
        setCurrentField(newField);
      } else if (newField.type === "timePicker") {
        setOpenTimePickerDialog(true);
        setCurrentField(newField);
      } else if (newField.type === "fileUpload") {
        setOpenFileUploadDialog(true);
        setCurrentField(newField);
      } else {
        setFields((fields) => [...fields, newField]);
      }
    }
  }, []);

  const onRemoveField = useCallback((id) => {
    setFields((fields) => fields.filter((field) => field.id !== id));
  }, []);

  useEffect(() => {
    setIsFormValid(formName && fields.length > 0);
  }, [fields, formName]);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const handleSaveForm = () => {
    setFormDialogOpen(true);
  };

  const handleFormSave = ({
    facultyVisibility,
    studentVisibility,
    approvalHierarchy,
    undertaking,
  }) => {
    const formData = {
      formName: formName,
      fields: fields,
      facultyVisibility,
      studentVisibility,
      approvalHierarchy,
      undertaking,
    };
    saveFormDataToAPI(formData);
  };

  const saveFormDataToAPI = async (formData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://ec2-65-0-133-29.ap-south-1.compute.amazonaws.com:8000/api/dynamicforms",
        formData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      console.log("Form saved successfully:", response.data);
      setMessage("Form saved successfully!");
      setSeverity("success");
      setOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error saving form data:", error);
      setMessage("Error saving form data!");
      setSeverity("error");
      setOpen(true);
    }
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Box sx={styles.mainContainer}>
      <LoggedInHeader />
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          pt: "80px",
        }}
      >
        <Button
          onClick={handleBackClick}
          startIcon={<ArrowBackIosNewIcon />}
          color="primary"
          sx={{
            color: "black",
          }}
        >
          Back
        </Button>
        <Typography variant="h4">Form Builder</Typography>{" "}
        <Button
          variant="contained"
          color="primary"
          disabled={!isFormValid}
          onClick={handleSaveForm}
          sx={{
            backgroundColor: "black",
            ":hover": {
              backgroundColor: "black",
              transform: "scale(1.01)",
              boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Save Form
        </Button>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {" "}
        <TextField
          label="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          sx={{ width: "21rem", marginLeft: ".5rem" }}
        />
      </Box>
      <Divider />
      <Box sx={{ pt: "1rem", flexGrow: 1 }}>
        <DndProvider backend={HTML5Backend}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ flexGrow: 1, display: "flex" }}>
                <Grid item xs={12} md={3} sx={{ display: "flex" }}>
                  <Paper sx={styles.paper}>
                    <Typography variant="h5" gutterBottom>
                      Toolbox
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <DraggableElement
                      type="inputField"
                      onAddField={onAddField}
                    />
                    <InputFieldDialog
                      open={
                        openDialog ||
                        (!!editingField && editingField.type === "inputField")
                      }
                      onClose={() => {
                        setOpenDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField && editingField.type === "inputField"
                          ? editingField
                          : null
                      }
                    />

                    <DraggableElement
                      type="multiTextArea"
                      onAddField={onAddField}
                    />
                    <MultiTextAreaDialog
                      open={
                        openMultiTextAreaDialog ||
                        (!!editingField &&
                          editingField.type === "multiTextArea")
                      }
                      onClose={() => {
                        setOpenMultiTextAreaDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField && editingField.type === "multiTextArea"
                          ? editingField
                          : null
                      }
                    />
                    <DraggableElement
                      type="radioButton"
                      onAddField={onAddField}
                    />
                    <RadioButtonDialog
                      open={
                        openRadioButtonDialog ||
                        (!!editingField && editingField.type === "radioButton")
                      }
                      onClose={() => {
                        setOpenRadioButtonDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField && editingField.type === "radioButton"
                          ? editingField
                          : null
                      }
                    />
                    <DraggableElement
                      type="checkboxGroup"
                      onAddField={onAddField}
                    />
                    <CheckboxGroupDialog
                      open={
                        openCheckboxGroupDialog ||
                        (!!editingField &&
                          editingField.type === "checkboxGroup")
                      }
                      onClose={() => {
                        setOpenCheckboxGroupDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField && editingField.type === "checkboxGroup"
                          ? editingField
                          : null
                      }
                    />
                    <DraggableElement
                      type="dropdownSelect"
                      onAddField={onAddField}
                    />
                    <DropdownSelectDialog
                      open={
                        openDropdownSelectDialog ||
                        (!!editingField &&
                          editingField.type === "dropdownSelect")
                      }
                      onClose={() => {
                        setOpenDropdownSelectDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField && editingField.type === "dropdownSelect"
                          ? editingField
                          : null
                      }
                    />
                    <DraggableElement
                      type="dropdownMultiSelect"
                      onAddField={onAddField}
                    />
                    <DropdownMultiSelectDialog
                      open={
                        openDropdownMultiSelectDialog ||
                        (!!editingField &&
                          editingField.type === "dropdownMultiSelect")
                      }
                      onClose={() => {
                        setOpenDropdownMultiSelectDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField &&
                        editingField.type === "dropdownMultiSelect"
                          ? editingField
                          : null
                      }
                    />
                    <DraggableElement
                      type="datePicker"
                      onAddField={onAddField}
                    />
                    <DatePickerDialog
                      open={
                        openDatePickerDialog ||
                        (!!editingField && editingField.type === "datePicker")
                      }
                      onClose={() => {
                        setOpenDatePickerDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField && editingField.type === "datePicker"
                          ? editingField
                          : null
                      }
                    />
                    <DraggableElement
                      type="timePicker"
                      onAddField={onAddField}
                    />
                    <TimePickerDialog
                      open={
                        openTimePickerDialog ||
                        (!!editingField && editingField.type === "timePicker")
                      }
                      onClose={() => {
                        setOpenTimePickerDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField && editingField.type === "timePicker"
                          ? editingField
                          : null
                      }
                    />
                    <DraggableElement
                      type="fileUpload"
                      onAddField={onAddField}
                    />
                    <FileUploadDialog
                      open={
                        openFileUploadDialog ||
                        (!!editingField && editingField.type === "fileUpload")
                      }
                      onClose={() => {
                        setOpenFileUploadDialog(false);
                        setEditingField(null);
                      }}
                      onSave={(fieldData) => {
                        if (editingField) {
                          setFields((fields) =>
                            fields.map((field) =>
                              field.id === editingField.id
                                ? { ...editingField, ...fieldData }
                                : field
                            )
                          );
                          setEditingField(null);
                        } else {
                          setFields((fields) => [
                            ...fields,
                            { ...currentField, ...fieldData },
                          ]);
                        }
                      }}
                      editingField={
                        editingField && editingField.type === "fileUpload"
                          ? editingField
                          : null
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4.5} sx={{ display: "flex" }}>
                  <Paper sx={styles.paper}>
                    <Typography variant="h5" gutterBottom>
                      Form Editor
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <FormEditor
                      fields={fields}
                      onAddField={onAddField}
                      onRemoveField={onRemoveField}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4.5} sx={{ display: "flex" }}>
                  <Paper sx={styles.paper}>
                    <Typography variant="h5" gutterBottom>
                      Form Preview
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <FormPreview fields={fields} formName={formName} />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </DndProvider>
      </Box>
      <FormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        onSave={handleFormSave}
      />
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormBuilderContainer;

// Switch, Slider, Email, Numbers.
