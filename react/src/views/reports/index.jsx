import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Reports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleCellClick = (params) => {
    if (params.field !== "__check__") {
      setSelectedRow(params.row);
      // Reset the feedback form visibility
      setShowFeedbackForm(false);
      // Show the report details without the feedback form
      setDialogOpen(true);
    }
  };

  const handleSelectionModelChange = (selectionModel) => {
    const isCheckboxSelected = selectionModel.length > 0;
    const isRowSelected = selectedRow !== null;

    if (isCheckboxSelected && isRowSelected) {
      // Clear the selected row if a checkbox is selected
      setSelectedRow(null);
      // Reset the feedback form visibility
      setShowFeedbackForm(false);
    }
  };

  const handleDenyClick = () => {
    // If no row is selected, return early
    if (!selectedRow) {
      console.log("No row selected. Returning early.");
      return;
    }
  
    console.log("Continuing with the logic...");
  
    // Open the modal for feedback only if a row is selected and feedback form is not already shown
    if (selectedRow && !showFeedbackForm) {
      // Show the feedback form
      setShowFeedbackForm(true);
      // Close the modal to hide the "Accept" and "Deny" buttons
      setDialogOpen(false);
      // Set the dialog to open again with only the "Confirm Deny" button
      setDialogOpen(true);
    }
  };

  const handleFeedbackChange = (event) => {
    // Update the feedback state as the user types
    setFeedback(event.target.value);
  };

  const handleDenyConfirm = () => {
    // Handle the logic for Deny confirmation and feedback submission
    // For now, let's log the feedback to the console
    console.log("Feedback:", feedback);

    // Close the modal
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    // Close the modal without taking any action
    setDialogOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "articles", headerName: "Articles", align: "center" },
    { field: "description", headerName: "Description", align: "center" },
    { field: "accountablePerson", headerName: "Accountable Person", align: "center" },
    { field: "dateOfAssumption", headerName: "Date of Assumption", align: "center" },
    { field: "quantityPerProperty", headerName: "Quantity per Property", align: "center" },
    { field: "quantityPerPhysical", headerName: "Quantity per Physical", align: "center" },
    { field: "shortageOverageQuantity", headerName: "Overage Quantity", align: "center" },
    { field: "shortageOverageValue", headerName: "Overage Value", align: "center" },
    { field: "unitOfMeasure", headerName: "Unit of Measure", align: "center" },
    { field: "unitValue", headerName: "Unit Value", align: "center" },
    { field: "physicalValue", headerName: "Physical Value", align: "center" },
    { field: "propertyNumber", headerName: "Property Number", align: "center" },
    { field: "remarks", headerName: "Remarks", align: "center" },
    { field: "registrarId", headerName: "Registrar ID", align: "center" },
  ];

  useEffect(() => {
    // Display the feedback form when the dialog is open and the "Deny" button is clicked
    if (dialogOpen && selectedRow && showFeedbackForm) {
      setShowFeedbackForm(true);
    } else {
      setShowFeedbackForm(false);
    }
  }, [dialogOpen, selectedRow, showFeedbackForm]);

  return (
    <Box m="20px 20px 0 20px">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gridColumn: "span 2",
          alignItems: "center",
        }}
      >
        <Header title="REPORTS" subtitle="List of all pending inputs" />
        <Box display="flex">
        </Box>
      </div>
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataInvoices}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onCellClick={handleCellClick}
          onSelectionModelChange={handleSelectionModelChange}
        />
      </Box>

      {/* Dialog to display details and collect feedback */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>Report Details</DialogTitle>
    <DialogContent>
    {selectedRow && (
  <ul>
    {columns.map((column) => (
      <li key={column.field}>
        <strong>{column.headerName}:</strong> {selectedRow[column.field]}
      </li>
    ))}
  </ul>
)}

      {/* Show the feedback form only when Deny button is clicked */}
      {showFeedbackForm && (
        <TextareaAutosize
          placeholder="Provide feedback..."
          value={feedback}
          onChange={handleFeedbackChange}
          style={{ width: "400px", minHeight: "200px", marginTop: "10px" }}
        />
      )}
    </DialogContent>
    <DialogActions>
      {/* Updated buttons based on your requirements */}
      {!showFeedbackForm && (
        <>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
          >
            Accept
          </Button>
          <Button
            onClick={() => handleDenyClick()}
            variant="contained"
            style={{ backgroundColor: "red", color: "white" }}
            disabled={!selectedRow}
          >
            Deny
          </Button>
        </>
      )}
      {showFeedbackForm && (
        <>
          <Button
            onClick={handleDenyConfirm}
            variant="contained"
            style={{ backgroundColor: "red", color: "white", marginRight: "10px" }}
          >
            Confirm Deny
          </Button>
          <Button
            onClick={() => {
              setDialogOpen(false);
              setShowFeedbackForm(false);
            }}
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
          >
            Cancel
          </Button>
        </>
      )}
    </DialogActions>
  </Dialog>
    </Box>
  );
};

export default Reports;
