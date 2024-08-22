import React, { useState, useRef, useEffect } from "react";
import "./Signin.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/init";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const [clickedButton, setClickedButton] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // console.log(`Key pressed: ${e.key}`);
      if (e.key === "Enter") {
        e.preventDefault()
        handleSignIn(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user, "userHere");

      alert("You are logged in successfully!");
      navigate("/dashboard1");
    } catch (error) {
      console.error("Error signing in:", error);
      alert(`Error signing in: ${error.message}`);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="signin-container">
      <div className="left-section">
        <img src="./undraw_studying_re_deca 1.png" alt="Join Now" />
        <h2>Join Now</h2>
        <p>Just a couple of clicks and we start</p>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      <div className="right-section">
        <div className="content-div">
          <h1>Sign In</h1>

          <TextField
            id="outlined-basic"
            size="small"
            label="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            variant="outlined"
            sx={{
              width: "100%",
              "& .MuiInputLabel-root": { fontSize: "0.8rem" }
            }}
          />
          <FormControl
            sx={{ mt: 2, flex: 1, width: "100%" }}
            variant="outlined"
            size="small"
          >
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{ fontSize: "0.8rem", width: "100%" }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
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
              label="Password"
            />
          </FormControl>
          <Typography sx={{ mt: 1, fontSize: "0.8rem", textAlign: "right" }}>
            <Link to="/password" sx={{ fontSize: "0.8rem" }}>
              Forgot Password?
            </Link>
          </Typography>

          <button className="btn" type="submit" onClick={handleSignIn}>
            Login
          </button>
          <p className="small_txt">
            Don't have an account{" "}
            <span>
              <Link to="/signup">SignUp</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;





