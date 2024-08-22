import React from "react";
import { Box } from "@mui/material";
import "./Dashboard1.css";
import ApexChart from "./Chart";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Dashboard1 = () => {
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
        <Navbar title="Dashboard" />

        <div className="card-container">
          <div className="card">
            <div className="right-side">
              <div className="card-image"></div>
            </div>
            <div className="left-side">
              <h3 className="card-title">Total Scheduled Interviews</h3>
              <p className="card-para">5</p>
            </div>
          </div>
          <div className="card1">
            <div className="card1-header">
              <div className="card1-image"></div>
              <h3 className="card1-title">Accepted</h3>
              <p className="card1-para">3</p>
            </div>
          </div>
          <div className="card2">
            <div className="card2-header">
              <div className="card2-image"></div>
              <h3 className="card2-title">Rejected</h3>
              <p className="card2-para">2</p>
            </div>
          </div>
          <div className="card3">
            <div className="card3-header">
              <div className="card3-image"></div>
              <h3 className="card3-title">Others</h3>
              <p className="card3-para">0</p>
            </div>
          </div>
          <div className="card4">
            <div className="card4-header">
              <div className="card4-image"></div>
              <h3 className="card4-title">Total Weeks</h3>
              <p className="card4-para">5</p>
            </div>
          </div>
          <div className="card5">
            <div className="card5-header">
              <div className="card5-image"></div>
              <h3 className="card5-title">Completed</h3>
              <p className="card5-para">5</p>
            </div>
          </div>
          <div className="card6">
            <div className="card6-header">
              <div className="card6-image"></div>
              <h3 className="card6-title">Pending</h3>
              <p className="card6-para">5</p>
            </div>
          </div>
        </div>
        <div className="chart">
          <ApexChart />
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard1;
