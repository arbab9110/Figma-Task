import React, { useState } from "react";
import {
  Drawer,
  List,
  Toolbar,
  Box
} from "@mui/material";
import "./sidevar.css";
import Logo from "../assets/Group 4@2x.png"; 
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Assessment";
import InterviewIcon from "@mui/icons-material/QuestionAnswer";
import StipendIcon from "@mui/icons-material/MonetizationOn";
import { useDispatch, useSelector } from 'react-redux'
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { increment, incrementByAmount } from "../Redux/stateSlice";

const Sidebar = () => {
  const state = useSelector((state) => state.state.value)
  const dispatch = useDispatch()
  console.log(state, "state")
  const menuItems = [
    { href: "/dashboard1", text: "Dashboard", icon: <DashboardIcon /> },
    { href: "/report", text: "Reports", icon: <ReportIcon /> },
    { href: "/interview", text: "Interviews", icon: <InterviewIcon /> },
    { href: "/stipend", text: "Stipend", icon: <StipendIcon /> },
    { href: "/setting", text: "Settings", icon: <SettingsIcon /> }
  ];
  return (
    <>
      <Drawer
        sx={{
          width: "240px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "240px",
            boxSizing: "border-box",
            backgroundColor: "#e0f7f4"
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px 0"
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "60%", height: "auto", marginTop: "-70px" }}
          />
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.href}
                onClick={() => dispatch(incrementByAmount(item.text))}
                className={state === item.text ? "item activeNav" : "item"}
              >
                {item.icon}
                {item.text}
              </Link>
            </div>
          ))}
        </List>       
      </Drawer>
    </>
  );
};

export default Sidebar;





