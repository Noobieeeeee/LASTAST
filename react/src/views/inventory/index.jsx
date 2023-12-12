import React, { useState } from "react";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { mockDataContacts } from "../../data/mockData";
import { tokens } from "../../../../theme";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "articles", headerName: "Articles", align: "center", flex: 2 },
    { field: "description", headerName: "Description", align: "center", flex: 2 },
    { field: "accountablePerson", headerName: "Accountable Person", align: "center", flex: 2 },
    { field: "dateOfAssumption", headerName: "Date of Assumption", align: "center", flex: 2 },
    { field: "quantityPerProperty", headerName: "Quantity per Property", align: "center", flex: 2 },
    { field: "quantityPerPhysical", headerName: "Quantity per Physical", align: "center", flex: 2 },
    { field: "shortageOverageQuantity", headerName: "Shortage/Overage Quantity", align: "center", flex: 2 },
    { field: "shortageOverageValue", headerName: "Shortage/Overage Value", align: "center", flex: 2 },
    { field: "unitOfMeasure", headerName: "Unit of Measure", align: "center", flex: 2 },
    { field: "unitValue", headerName: "Unit Value", align: "center", flex: 2 },
    { field: "physicalValue", headerName: "Physical Value", align: "center", flex: 2 },
    { field: "propertyNumber", headerName: "Property Number", align: "center", flex: 2 },
    { field: "remarks", headerName: "Remarks", align: "center", flex: 2 },
    { field: "registrarId", headerName: "Registrar ID", align: "center", flex: 2 },
  ];

  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCellClick = (params) => {
    const selectedRowIndex = params.row.id - 1; // Adjust index based on your data
    setSelectedRow(mockDataContacts[selectedRowIndex]);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box m="20px">
      <Header title="Inventory" subtitle="Stored Data" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="100%"
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
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onCellClick={handleCellClick}
        />
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
        {selectedRow && (
            <div>
              <Typography variant="h6">Selected Row Details:</Typography>
              <ul>
                {columns.map((column) => (
                  <li key={column.field}>
                    <strong>{column.headerName}:</strong> {selectedRow[column.field]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;
