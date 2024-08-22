import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField
} from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { interviews } from "./data";
import "./Interviews.css";
import { Search } from "@mui/icons-material";
import { FaFilter } from "react-icons/fa";

const statusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#FFEB3B";
    case "Accepted":
      return "#C8E6C9";

    default:
      return "#FFFFFF";
  }
};

const Interviews = () => {
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
        <Navbar title="Interview" />

        <div className="content3">
          <div className="filter_btn">
            <h4 className="title">Interviews</h4>
            <div className="right">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search Users by Company Name, Email or Date"
                InputProps={{
                  startAdornment: <Search />
                }}
                sx={{
                  width: 430,
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
              <th>Company Name</th>
              <th>Track Name</th>
              <th>Applied On</th>
              <th>Interview Details</th>
              <th>Interview Status</th>
              <th>Result/Remarks</th>
              <th>Actions</th>
            </tr>
            {interviews.map((data, index) => (
              <tr key={index}>
                <td>{data.companyName}</td>
                <td>{data.trackName}</td>
                <td>{data.appliedOn}</td>
                <td>{data.interviewDetails}</td>

                <td className="s">
                  <p
                    className="status"
                    style={{
                      backgroundColor: statusColor(data.interviewStatus)
                    }}
                  >
                    {data.interviewStatus}
                  </p>
                </td>
                <td>{data.results}</td>
                <td>
                  <HiOutlineDotsVertical />
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Box>
    </Box>
  );
};

export default Interviews;
