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
import "./Reports.css";
import ApexChart from "./Chart";
import { Search } from "@mui/icons-material";
import { MdOutlineFileUpload } from "react-icons/md";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/system";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { assignments } from "./data";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const statusColor = (status) => {
  switch (status) {
    case "Pending":
      return "#FFEB3B";
    case "Submitted":
      return "#C8E6C9";
    case "Overdue":
      return "#FFCDD2";
    default:
      return "#FFFFFF";
  }
};

const StyledBox = styled(Box)({
  width: "320px",
  margin: "1",
  marginTop: "16px"
});

const top100Films = [
  { label: "Pending" },
  { label: "Submitted" },
  { label: "Overdue" }
];
const week = [
  { label: "1st Week" },
  { label: "2nd Week" },
  { label: "3rd Week" }
];
const Reports = () => {
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
        <Navbar title="Report" />
        <div className="div-container">
          <div className="filter">
            <StyledBox
              sx={{
                margin: "0"
              }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: "1",
                      height: "53px"
                    }}
                  >
                    <Typography variant="h6" component="div" gutterBottom>
                      Overview
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Foundation, Week 1
                    </Typography>
                  </Box>
                  <div className="content">
                    <Box sx={{ my: 2, textAlign: "center" }}>
                      <Typography variant="body1" display={"flex"}>
                        Assignments
                      </Typography>
                      <Grid container spacing={7} justifyContent="center">
                        <Grid item>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6">05</Typography>
                            <Typography variant="body2">Total</Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6">03</Typography>
                            <Typography variant="body2">Pending</Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6">02</Typography>
                            <Typography variant="body2">Completed</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      display={"flex"}
                      fontSize={"15px"}
                      gutterBottom
                    >
                      Jump Right back in!
                    </Typography>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      width="50px"
                    >
                      Apply Filter
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </StyledBox>
            <div className="additional-div">
              <ApexChart />
            </div>
          </div>
          <div className="content2">
            <div className="filter_btn">
              <h4 className="title">Assignment</h4>
              <div className="right">
                <p className="filter-text">Clear all filters</p>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Filter"
                  sx={{
                    width: 100,
                    "& .MuiInputBase-input::placeholder": {
                      fontSize: "0.90rem"
                    }
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "20px",

                boxSizing: "border-box"
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="Title"
                InputProps={{
                  startAdornment: <Search />
                }}
                sx={{
                  width: 160,
                  "& .MuiInputBase-root": {
                    backgroundColor: "#E1EDEA"
                  }
                }}
              />
              <TextField type="date" variant="outlined" size="small" />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={top100Films}
                sx={{ width: 230 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Submission status"
                    InputLabelProps={{
                      sx: { fontSize: "0.85rem" }
                    }}
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={week}
                sx={{ width: 170 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Week"
                    InputLabelProps={{
                      sx: { fontSize: "0.85rem" }
                    }}
                  />
                )}
              />

              <TextField
                variant="outlined"
                size="small"
                placeholder="Search by Assignment Results"
                sx={{
                  width: 250,
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "0.90rem"
                  }
                }}
              />
            </div>
            <table>
              <tr>
                <th>Assignment</th>
                <th>Week</th>
                <th>Deadline</th>
                <th>Submission status</th>
                <th>Assessment Result </th>
                <th>Actions</th>
              </tr>
              {assignments.map((data, index) => (
                <tr key={index}>
                  <td>{data.title}</td>
                  <td>{data.week}</td>
                  <td>{data.deadline}</td>
                  <td className="s">
                    <p
                      className="status"
                      style={{ backgroundColor: statusColor(data.status) }}
                    >
                      {data.status}
                    </p>
                  </td>
                  <td>{data.result}</td>
                  <td>
                    <MdOutlineFileUpload />
                    <HiOutlineDotsVertical />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Reports;
