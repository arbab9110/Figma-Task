import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {
  Box,
 
} from "@mui/material";
import "./Setting.css";

import Account from "./Account";
import Notification from "./Notification";

const Setting = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("");

  const [active, setActive] = useState("account");

  const onOptionChange = (e) => {
    setGender(e.target.value);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const register = [{ label: "Employee" }, { label: "Candidate" }];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        height: "100vh",
        overflow: "hidden"
      }}
    >
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
        <Navbar title="Setting" />
        <div className="main-div">
          <div className="slide">
            <a
              className={active === "account" && "active"}
              onClick={() => setActive("account")}
            >
              Accounts
            </a>
            <a
              className={active === "notification" && "active"}
              onClick={() => setActive("notification")}
            >
              Notification
            </a>
          </div>
          {active === "account" && <Account />}
          {active === "notification" && <Notification />}
        </div>
      </Box>
    </Box>
  );
};

export default Setting;
