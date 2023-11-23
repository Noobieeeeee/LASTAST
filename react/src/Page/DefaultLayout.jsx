import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { Box, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { ProSidebar, Menu as ProMenu, MenuItem as ProMenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import InventoryIcon from '@mui/icons-material/Inventory';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import admin_image from "../img/admin.png";

import { useTheme } from "@mui/material/styles";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ProMenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </ProMenuItem>
  );
};

const DefaultLayout = () => {
  const { user, token, setUser, setToken, notification } = useStateContext();
  const [logoutMenuAnchor, setLogoutMenuAnchor] = useState(null);

  const handleLogoutClick = (event) => {
    setLogoutMenuAnchor(event.currentTarget);
  };

  const handleLogoutClose = () => {
    setLogoutMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await axiosClient.post("/logout");
      setUser({});
      setToken(null);
      handleLogoutClose();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get("/user");
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [setUser]); // Only include setUser in the dependency array

  if (!token) {
    return <Navigate to="/login" />;
  }

  return user ? (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar user={user} />
      <div className="content" style={{ flex: 1, overflow: "auto", backgroundColor: "#fff", color: "#000" }}>
        <header
          style={{
            background: "#5b08a7",
            color: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div></div>
          <div>
            <IconButton onClick={handleLogoutClick}>
              <PersonOutlinedIcon />
            </IconButton>
            <Menu
              anchorEl={logoutMenuAnchor}
              open={Boolean(logoutMenuAnchor)}
              onClose={handleLogoutClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </Box>
  ) : null;
};

const Sidebar = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <ProMenu iconShape="square">
          <ProMenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}></Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </ProMenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={admin_image}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.name}
                </Typography>
                <Typography variant="h" color={colors.greenAccent[500]}>
                  VP Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Accounts"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Inventory"
              to="/inventory"
              icon={<InventoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reports"
              to="/reports"
              icon={<InventoryRoundedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profiles"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </ProMenu>
      </ProSidebar>
    </Box>
  );
};

export default DefaultLayout;
