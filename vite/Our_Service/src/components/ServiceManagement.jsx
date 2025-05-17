import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer,Typography, TableHead, TableRow, Paper } from "@mui/material";
import { deleteServiceAction } from "../redux/Slices/adminSlice";
import { useDispatch } from "react-redux";

const ServiceManagement = ({ services }) => {
  const dispatch = useDispatch();

  const handleDeleteService = (id) => {
    dispatch(deleteServiceAction(id));
  };

  return (
    <div className="service-management">
      <Typography variant="h6">Service Management</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service._id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteService(service._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ServiceManagement;
