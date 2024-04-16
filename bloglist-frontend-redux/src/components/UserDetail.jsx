import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const UserDetail = ({ user }) => {
  if (!user) return null;
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Added blogs
      </Typography>
      <List>
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map((blog) => {
            return (
              <ListItem key={blog.id}>
                <Card>
                  <CardContent>
                    <ListItemText primary={blog.title} />
                  </CardContent>
                </Card>
              </ListItem>
            );
          })
        ) : (
          <Typography component="div" variant="subtitle1">
            None
          </Typography>
        )}
      </List>
    </>
  );
};

export default UserDetail;
