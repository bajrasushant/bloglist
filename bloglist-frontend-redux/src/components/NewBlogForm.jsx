import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Box, Button, Divider, TextField } from "@mui/material";

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const hideWhenVisible = { display: newBlogFormVisible ? "none" : "" };
  const showWhenVisible = { display: newBlogFormVisible ? "" : "none" };

  const addBlog = (event) => {
    event.preventDefault();
    try {
      dispatch(createBlog({ title, author, url }));
      dispatch(
        setNotification({
          message: `a new blog ${title} by ${author} added`,
          status: "success",
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({ message: "Something went wrong", status: "error" }),
      );
    } finally {
      setNewBlogFormVisible(false);
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  const handleTitleChange = ({ target }) => setTitle(target.value);
  const handleAuthorChange = ({ target }) => setAuthor(target.value);
  const handleUrlChange = ({ target }) => setUrl(target.value);

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          style={{ margin: "1em 0" }}
          variant="contained"
          onClick={() => setNewBlogFormVisible(true)}
        >
          New Blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 2, width: "25ch" },
          }}
          autoComplete="off"
          onSubmit={addBlog}
        >
          <h2>Create new</h2>
          <div>
            <TextField
              id="outlined-basic"
              label="title"
              variant="outlined"
              value={title}
              size="small"
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="author"
              variant="outlined"
              value={author}
              size="small"
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="url"
              variant="outlined"
              value={url}
              size="small"
              onChange={handleUrlChange}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="success" type="submit">
              Create
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setNewBlogFormVisible(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default NewBlogForm;
