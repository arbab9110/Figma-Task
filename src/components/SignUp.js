import React, { useState } from "react";
import "./SignUp.css";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/joy/Autocomplete";
import ListItem from "@mui/joy/ListItem";
import { doc, setDoc } from "firebase/firestore";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase/init";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  // const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    
    setPasswordError("");
    setConfirmPasswordError("");
    setFormError("");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !selectedOption ||
      !gender
    ) {
      setFormError("Please fill in all fields.");
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const obj = {
        firstName,
        lastName,
        email,
        gender,
        registerAs: selectedOption
      };

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user, "user");

      await setDoc(doc(db, "Candidate-Form", user.uid), obj);

      alert("Data Stored");
      navigate("/candidateForm");
    } catch (error) {
      console.error("Error during form submission:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const register = [{ label: "Employee" }, { label: "Candidate" }];

 
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    if (formError) setFormError("");
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    if (formError) setFormError("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (formError) setFormError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (passwordError) setPasswordError("");
    if (confirmPasswordError) setConfirmPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (confirmPasswordError) setConfirmPasswordError("");
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    if (formError) setFormError("");
  };

  const handleRegisterChange = (event, newValue) => {
    setSelectedOption(newValue);
    if (formError) setFormError("");
  };

  return (
    <div className="signup-container">
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
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          {formError && <p className="form-error">{formError}</p>}
          <div className="name-inputs">
            <TextField
              required
              id="firstName"
              size="small"
              label="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              variant="outlined"
              sx={{ flex: 1, "& .MuiInputLabel-root": { fontSize: "0.8rem" } }}
            />
            <TextField
              required
              id="lastName"
              size="small"
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              variant="outlined"
              sx={{ flex: 1, "& .MuiInputLabel-root": { fontSize: "0.8rem" } }}
            />
          </div>

          <TextField
            required
            type="email"
            id="email"
            size="small"
            label="Email"
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            sx={{
              width: "100%",
              "& .MuiInputLabel-root": { fontSize: "0.8rem" }
            }}
          />

          <div className="password-inputs">
            <FormControl
              sx={{ mt: 2, flex: 1 }}
              variant="outlined"
              size="small"
              error={Boolean(passwordError)}
            >
              <InputLabel htmlFor="password" sx={{ fontSize: "0.8rem" }}>
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
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
                required
              />
              {passwordError && (
                <FormHelperText>{passwordError}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              sx={{ mt: 2, flex: 1 }}
              variant="outlined"
              size="small"
              error={Boolean(confirmPasswordError)}
            >
              <InputLabel
                htmlFor="confirm-password"
                sx={{ fontSize: "0.8rem" }}
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
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
                required
              />
              {confirmPasswordError && (
                <FormHelperText>{confirmPasswordError}</FormHelperText>
              )}
            </FormControl>
          </div>

          <div className="gender-inputs">
            <label>Gender</label>
            <label className="label-1">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
              />
              Male
            </label>
            <label className="label-1">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
              />
              Female
            </label>
          </div>

          <div className="register-input">
            <Autocomplete
              placeholder="Register As"
              value={selectedOption}
              onChange={handleRegisterChange}
              options={register}
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              renderOption={(props, option) => (
                <ListItem
                  {...props}
                  sx={{
                    width: "100%",
                    backgroundColor: "#df95dc",
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "#c566c2",
                      color: "black"
                    }
                  }}
                >
                  {option.label}
                </ListItem>
              )}
            />
          </div>

          <button className="btn" type="submit">
            Next
          </button>

          <p className="small_txt">
            Already a member?{" "}
            <span>
              <Link to="/">Sign In</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
