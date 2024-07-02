import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "../services/ApiService";
import CommonModal from "./CommonModal";
import AddEditUser from "./AddEditUser";

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phoneNumber", label: "Phone Number", minWidth: 150 },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" }, // New column for actions
];

function Usertable({ userList, fetchUsers }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [model, setModel] = useState(false);
  const [modelPayload, setModelPayload] = useState({ data: null, type: null });

  const handleCloseModel = () => {
    setModel(false);
    setModelPayload({ data: null, type: null });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = async (userId) => {
    const getUserData = userList.find((f) => f.id === userId);
    console.log(getUserData);

    setModel(true);
    setModelPayload({ data: getUserData, type: "EDIT" });
  };

  const handleDeleteClick = async (userId) => {
    // Implement delete functionality here, e.g., show confirmation dialog and delete user
    try {
      // Call the deleteUser method from apiService to delete the user
      const response = await apiService.deleteUser(userId);

      if (response && fetchUsers) {
        fetchUsers();
      }
      // Optionally, refresh the user list or update state after successful deletion
      console.log(`User with ID ${userId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error.message);
      // Handle error gracefully (e.g., display error message to user)
    }
  };

  const getContentModel = () => {
    if (modelPayload) {
      if (modelPayload.type === "EDIT") {
        return (
          <AddEditUser
            data={modelPayload.data}
            type={modelPayload.type}
            fetchUsers={fetchUsers}
            handleCloseModel={handleCloseModel}
          />
        );
      }

      if (modelPayload.type === "DELETE") {
        return <></>;
      }
    }

    return <></>;
  };

  return (
    <>
      <Paper
        style={{ paddingBottom: "2%" }}
        sx={{ width: "100%", overflow: "hidden" }}
      >
        <TableContainer sx={{ maxHeight: 440, overflow: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {column.id !== "actions" ? (
                          row[column.id]
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <IconButton
                              aria-label="edit"
                              onClick={() => handleEditClick(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDeleteClick(row.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {model && (
        <CommonModal
          handleClose={handleCloseModel}
          open={model}
          title={"Edit"}
          content={getContentModel()}
          size="xs"
        />
      )}
    </>
  );
}

export default Usertable;
