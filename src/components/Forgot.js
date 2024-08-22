import React, { useState } from "react";
import "./Forgot.css";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getAuth, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      if (user) {
        await updatePassword(user, password);
        setSuccess("Password updated successfully.");
        navigate("/");
      } else {
        setError("No user is currently logged in.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="forgot-container">
      <div className="left-section">
        <img
          src="./undraw_forgot_password_re_hxwm 2.png"
          alt="Forgot Password"
        />
        <h2>Reset Your Password</h2>
        <p>Just a couple of clicks and you're back in</p>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      <div className="right-section">
        <div className="password">
          <h1>Reset Password</h1>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <FormControl
            sx={{ mt: 2, flex: 1, width: "100%" }}
            variant="outlined"
            size="small"
          >
            <InputLabel
              htmlFor="new-password"
              sx={{ fontSize: "0.8rem", width: "100%" }}
            >
              New Password
            </InputLabel>
            <OutlinedInput
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ fontSize: "0.4rem" }}
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ fontSize: "1.2rem" }} />
                    ) : (
                      <Visibility sx={{ fontSize: "1.2rem" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>

          <FormControl
            sx={{ mt: 2, flex: 1, width: "100%" }}
            variant="outlined"
            size="small"
          >
            <InputLabel
              htmlFor="confirm-password"
              sx={{ fontSize: "0.8rem", width: "100%" }}
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ fontSize: "0.4rem" }}
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ fontSize: "1.2rem" }} />
                    ) : (
                      <Visibility sx={{ fontSize: "1.2rem" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>

          <button className="btn" type="submit" onClick={handleSubmit}>
            Reset Password
          </button>
          <p className="small_txt">You will be redirected automatically.</p>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
