import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { Link } from "react-router-dom";
import { List, Button, ListItem } from "@mui/material";

const Navigation = ({ user }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedUser");
      window.location.reload();
    } catch {
      dispatch(
        setNotification({ message: "something went wrong", status: "error" }),
      );
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "text.disabled",
        display: "flex",
        justifyContent: "center",
        flexWrap: "nowrap", // Default to no wrap
        "@media (max-width: 600px)": {
          flexWrap: "wrap", // Apply wrap on screens smaller than 600px
        },
      }}
      component="nav"
    >
      <ListItem>
        <Link to="/" style={{ textDecoration: "none" }}>
          Blogs
        </Link>
      </ListItem>
      <ListItem>
        <Link to="/users" style={{ textDecoration: "none" }}>
          Users
        </Link>
      </ListItem>
      <ListItem>
        {user.name} is logged in
      </ListItem>
      <ListItem>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => handleLogout()}
        >
          logout
        </Button>
      </ListItem>
    </List>
  );
};

export default Navigation;
