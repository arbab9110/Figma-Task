import React from "react";
import "./Notification.css";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Notification = () => {
  return (
    <div className="notify">
      <div className="box1">
        <div className="interview1">
          <p>Email Alerts </p>
          <Switch {...label} />
        </div>
        <div className="interview1">
          <p>Interviews </p>
          <Switch {...label} />
        </div>
        <div className="interview1">
          <p>Interviews </p>
          <Switch {...label} />
        </div>
      </div>
      <div className="box1">
        <div className="interview1">
          <p>SMS Alerts </p>
          <Switch {...label} />
        </div>
        <div className="interview1">
          <p>Interviews </p>
          <Switch {...label} />
        </div>
        <div className="interview1">
          <p>Interviews </p>
          <Switch {...label} />
        </div>
      </div>
    </div>
  );
};

export default Notification;
