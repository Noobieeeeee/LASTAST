import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import Header from "../components/Header.jsx";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const getUsers = () => {
    setLoading(true);
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "created_at", headerName: "Create Date", width: 200 },
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
    <div style={{ height: "100%", width: "100%", paddingLeft: "20px"  }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingRight: "20px" }}>
        <Header title="Users" subtitle="Managing the Team Members" />
        <Link className="btn-add" to="/users/new" style={{ fontSize: "18px" }}>
          Add new
        </Link>
      </div>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: GridToolbar,
        }}
        loading={loading}
        autoHeight
      />
    </div>
  );
}