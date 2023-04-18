import React, { useState, useCallback } from "react";
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
} from "@mui/material";

import LoggedInHeader from "../LoggedInHeader";
import InputFieldDialog from "./Toolbox/InputFieldDialog";
import MultiTextAreaDialog from "./Toolbox/MultiTextAreaDialog";
import ButtonDialog from "./Toolbox/ButtonDialog";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  paper: {
    p: 2,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100%",
  },
};

const FormBuilderContainer = () => {
  const [fields, setFields] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [openMultiTextAreaDialog, setOpenMultiTextAreaDialog] = useState(false);
  const [openButtonDialog, setOpenButtonDialog] = useState(false);

  const onAddField = useCallback((newField) => {
    if (newField.type === "inputField") {
      setOpenDialog(true);
      setCurrentField(newField);
    } else if (newField.type === "multiTextArea") {
      setOpenMultiTextAreaDialog(true);
      setCurrentField(newField);
    } else if (newField.type === "button") {
      setOpenButtonDialog(true);
      setCurrentField(newField);
    } else {
      setFields((fields) => [...fields, newField]);
    }
  }, []);

  const onRemoveField = useCallback((id) => {
    setFields((fields) => fields.filter((field) => field.id !== id));
  }, []);

  const onSetHierarchy = () => {
    console.log("Form data to store in the database:", fields);
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
        <Typography variant="h4">Form Builder</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onSetHierarchy}
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
      <Box sx={{ pt: "1rem", flexGrow: 1 }}>
        <DndProvider backend={HTML5Backend}>
          <Container maxWidth="xl">
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Grid container spacing={2} sx={{ flexGrow: 1, height: "75vh" }}>
                <Grid item xs={12} md={3}>
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
                      open={openDialog}
                      onClose={() => setOpenDialog(false)}
                      onSave={(fieldData) => {
                        setFields((fields) => [
                          ...fields,
                          { ...currentField, ...fieldData },
                        ]);
                      }}
                    />{" "}
                    <DraggableElement
                      type="multiTextArea"
                      onAddField={onAddField}
                    />
                    <MultiTextAreaDialog
                      open={openMultiTextAreaDialog}
                      onClose={() => setOpenMultiTextAreaDialog(false)}
                      onSave={(fieldData) => {
                        setFields((fields) => [
                          ...fields,
                          { ...currentField, ...fieldData },
                        ]);
                      }}
                    />
                    <DraggableElement type="button" onAddField={onAddField} />
                    <ButtonDialog
                      open={openButtonDialog}
                      onClose={() => setOpenButtonDialog(false)}
                      onSave={(fieldData) => {
                        setFields((fields) => [
                          ...fields,
                          { ...currentField, ...fieldData },
                        ]);
                      }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4.5}>
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
                <Grid item xs={12} md={4.5}>
                  <Paper sx={styles.paper}>
                    <Typography variant="h5" gutterBottom>
                      Form Preview
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <FormPreview fields={fields} />
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </DndProvider>
      </Box>
    </Box>
  );
};

export default FormBuilderContainer;
