import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    display: notification ? "block" : "none",
    margin: "5px 0",
  };

  return (
    <Alert variant="filled" style={style} severity={notification.status}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
