import React from "react";
import { Box, TextField } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { MdOutlineFileUpload } from "react-icons/md";
import { stipend } from "./data";
import "./Interviews.css";
import { Search } from "@mui/icons-material";
import { FaFilter } from "react-icons/fa";

const statusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#FFEB3B";
    case "Recieved":
      return "#C8E6C9";

    default:
      return "#FFFFFF";
  }
};

const Stipend = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#d8e9e7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "100%"
        }}
      >
        <Navbar title="Stipend" />

        <div className="content3">
          <div className="filter_btn">
            <h4 className="title">Stipend Challan</h4>
            <div className="right">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search Users by Challan Description, Company Name or Date"
                InputProps={{
                  startAdornment: <Search />
                }}
                sx={{
                  width: 520,
                  "& .MuiInputBase-root": {
                    backgroundColor: "#E1EDEA"
                  }
                }}
              />
              <FaFilter size={30} />
            </div>
          </div>
          <table>
            <tr>
              <th>Challan Description</th>
              <th>Company Name</th>
              <th>Track Name</th>
              <th>Due Date</th>
              <th>Credited At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            {stipend.map((data, index) => (
              <tr key={index}>
                <td>{data.challanDescription}</td>
                <td>{data.companyName}</td>
                <td>{data.trackName}</td>
                <td>{data.dueDate}</td>
                <td>{data.creditedAt}</td>
                <td className="s">
                  <p
                    className="status"
                    style={{ backgroundColor: statusColor(data.status) }}
                  >
                    {data.status}
                  </p>
                </td>

                <td>
                  <MdOutlineFileUpload />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Box>
    </Box>
  );
};

export default Stipend;
