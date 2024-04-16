import { useDispatch } from "react-redux";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const loginSuccess = await dispatch(loginUser({ username, password }));
    if (loginSuccess) {
      dispatch(
        setNotification({
          message: "logged in successfully",
          status: "success",
        }),
      );
    } else {
      dispatch(
        setNotification({
          message: "wrong credentials, try again",
          status: "error",
        }),
      );
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2>Login to the application</h2>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Username"
          multiline
          maxRows={4}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <FormControl
          sx={{ m: 1, width: "23ch" }}
          variant="outlined"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
      <Button variant="contained" id="login-button" type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
