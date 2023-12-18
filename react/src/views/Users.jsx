import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Header from "../components/Header.jsx";
import { Box, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { tokens } from "../../../theme";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNotification } = useStateContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getUsers();
  }, []);

  const onDeleteClick = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient
      .delete(`/users/${user.id}`)
      .then(() => {
        setNotification("User was successfully deleted");
        getUsers();
      });
  };

  const handleCellClick = (params) => {
    setSelectedRow(params.row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
          console.log("API Response:", data);
          setLoading(false);
          setUsers(data.data);
      })
      .catch((error) => {
          console.error("API Error:", error);
          setLoading(false);
      });
};


  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "created_at", headerName: "Create Date", width: 200 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "address", headerName: "Address", width: 200, align: "center" },
    { field: "contact_number", headerName:"Contact #", width: 150},
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Link className="btn-edit" to={`/users/${params.row.id}`}>
            Edit
          </Link>
          &nbsp;
          <button
            className="btn-delete"
            onClick={(ev) => onDeleteClick(params.row)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%", paddingLeft: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingRight: "20px" }}>
        <Header title="Users" subtitle="Managing the Team Members" />
        <Link className="btn-add" to="/users/new" style={{ fontSize: "18px" }}>
          Add new
        </Link>
      </div>
      <DataGrid
          rows={users}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          loading={loading}
          autoHeight
          onCellClick={handleCellClick}
          // pagination={false}  // Disable pagination
        />


      {/* Dialog to display details of the selected row */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
