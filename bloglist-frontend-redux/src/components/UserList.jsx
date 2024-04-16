import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => state.allUsers);
  return (
    <div>
      <h2>Users</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {[...users]
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={`/users/${user.id}`}
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
