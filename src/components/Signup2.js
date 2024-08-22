import React, { useState, useEffect } from "react";
import "./Signup2.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/joy/Autocomplete";
import InputMask from "react-input-mask";
import ListItem from "@mui/joy/ListItem";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/joy/Button";
import { styled } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/init";

const city = [
  { label: "Lahore" },
  { label: "Karachi" },
  { label: "Islamabad" },
  { label: "Multan" },
  { label: "Faisalabad" },
  { label: "Gujranwala" },
  { label: "Sialkot" },
  { label: "Murree" },
  { label: "Skardu" },
  { label: "Layyah" },
  { label: "Gujrat" },
  { label: "Peshawar" },
  { label: "Quetta" },
  { label: "Parachinar" },
  { label: "Kasur" }
];

const education = [
  { label: "Matriculation" },
  { label: "Intermediate" },
  { label: "Graduation" },
  { label: "Masters" }
];

const year = [
  { label: "2012" },
  { label: "2013" },
  { label: "2014" },
  { label: "2015" },
  { label: "2016" },
  { label: "2017" },
  { label: "2018" },
  { label: "2019" },
  { label: "2020" },
  { label: "2021" },
  { label: "2022" },
  { label: "2023" },
  { label: "2024" }
];

const employment = [
  { label: "Student" },
  { label: "Graduate" },
  { label: "Student and Working" },
  { label: "Graduate and Working" }
];

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const Signup2 = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cnic, setCnic] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [address, setAddress] = useState("");
  const [levelOfEducation, setLevelOfEducation] = useState("");
  const [startingYear, setStartingYear] = useState("");
  const [endingYear, setEndingYear] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [formError, setFormError] = useState("");
  const [cnicError, setCnicError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(""); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const a = auth.currentUser;

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "Candidate-Form", a.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    })();
  }, [a.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

   
    setFormError("");
    setCnicError("");
    setPhoneNumberError(""); 

    
    if (!/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError("Phone Number must contain only numbers.");
      hasError = true;
    }

    if (cnic.length !== 13 || !/^\d+$/.test(cnic)) {
      setCnicError("CNIC must be exactly 13 digits and contain only numbers.");
      hasError = true;
    }

    if (
      !phoneNumber ||
      !dateOfBirth ||
      !cnic ||
      !selectCity ||
      !address ||
      !levelOfEducation ||
      !startingYear ||
      !endingYear ||
      !employmentStatus
    ) {
      setFormError("Please fill in all fields.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const obj = {
        Number: phoneNumber,
        DateOfBirth: dateOfBirth,
        CNIC: cnic,
        City: selectCity,
        Address: address,
        Education: levelOfEducation,
        StartingYear: startingYear,
        EndingYear: endingYear,
        EmploymentStatus: employmentStatus,
        Job: jobTitle,
        Company: company,
        Experience: experience
      };
      const docRef = doc(db, "Candidate-Form", a?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, obj);
        console.log("Document updated successfully");
      } else {
        console.log("No such document to update!");
      }
      alert("Data Stored");
      navigate("/course");
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };

  const handleFieldChange = (setter) => (event) => {
    setter(event.target.value);
    if (formError || cnicError || phoneNumberError) {
      setFormError("");
      setCnicError("");
      setPhoneNumberError(""); 
    }
  };

  const handleAutocompleteChange = (setter) => (e, value) => {
    setter(value?.label || "");
    if (formError || cnicError || phoneNumberError) {
      setFormError("");
      setCnicError("");
      setPhoneNumberError(""); 
    }
  };

  return (
    <div className="signup2-container">
      <div className="left-section">
        <img src="./undraw_programmer_re_owql 2.png" alt="Join Now" />
        <h2>Join Now</h2>
        <p>Just a couple of clicks and we start</p>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      <div className="right-section">
        <form>
          <h1 className="header">Candidate Form</h1>
          {formError && <p className="form-error">{formError}</p>}
          {userData ? (
            <>
              <p className="text">
                {userData?.firstName} {userData?.lastName}
              </p>
              <p className="text">{userData?.email}</p>
            </>
          ) : (
            <p className="text"> Loading...</p>
          )}
          <div className="name-inputs">
            <TextField
              id="phone-number"
              size="small"
              label="Phone Number"
              value={phoneNumber}
              onChange={handleFieldChange(setPhoneNumber)}
              error={!!phoneNumberError}
              helperText={phoneNumberError}
              variant="outlined"
              sx={{ flex: 1, "& .MuiInputLabel-root": { fontSize: "0.8rem" } }}
            />
 <InputMask
  mask="99/99/9999"
  value={dateOfBirth}
  onChange={handleFieldChange(setDateOfBirth)}
>
  {() => (
    <TextField
      id="date-of-birth"
      size="small"
      label="Date of Birth"
      variant="outlined"
      sx={{ flex: 1, "& .MuiInputLabel-root": { fontSize: "0.8rem" } }}
      InputProps={{
        startAdornment: <InputAdornment position="start">📅</InputAdornment>,
      }}
      placeholder="DD/MM/YYYY"
    />
  )}
</InputMask>
          </div>
          <TextField
            id="cnic"
            size="small"
            label="CNIC or Form-B Number"
            value={cnic}
            onChange={handleFieldChange(setCnic)}
            error={!!cnicError}
            helperText={cnicError}
            variant="outlined"
            sx={{
              width: "100%",
              "& .MuiInputLabel-root": { fontSize: "0.8rem" }
            }}
          />
          <div className="name-inputs">
            <Autocomplete
              placeholder="City"
              value={city.find((option) => option.label === selectCity) || null}
              onChange={handleAutocompleteChange(setSelectCity)}
              options={city}
              renderOption={(props, option) => (
                <ListItem
                  {...props}
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "gray",
                      color: "black"
                    }
                  }}
                >
                  {option.label}
                </ListItem>
              )}
            />
            <TextField
              id="address"
              size="small"
              label="Address"
              value={address}
              onChange={handleFieldChange(setAddress)}
              variant="outlined"
              sx={{ flex: 1, "& .MuiInputLabel-root": { fontSize: "0.8rem" } }}
            />
          </div>
          <h2 className="title">Education</h2>
          <Autocomplete
            placeholder="Level of Education"
            value={
              education.find((option) => option.label === levelOfEducation) ||
              null
            }
            onChange={handleAutocompleteChange(setLevelOfEducation)}
            options={education}
            sx={{ width: "100%" }}
            renderOption={(props, option) => (
              <ListItem
                {...props}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  fontSize: "0.9rem",
                  padding: "8px 16px",
                  "&:hover": {
                    backgroundColor: "gray",
                    color: "black"
                  }
                }}
              >
                {option.label}
              </ListItem>
            )}
          />
          <div className="name-inputs">
            <Autocomplete
              placeholder="Starting Year"
              value={
                year.find((option) => option.label === startingYear) || null
              }
              onChange={handleAutocompleteChange(setStartingYear)}
              options={year}
              sx={{ flex: "1" }}
              renderOption={(props, option) => (
                <ListItem
                  {...props}
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "gray",
                      color: "black"
                    }
                  }}
                >
                  {option.label}
                </ListItem>
              )}
            />
            <Autocomplete
              placeholder="Ending Year"
              value={year.find((option) => option.label === endingYear) || null}
              onChange={handleAutocompleteChange(setEndingYear)}
              options={year}
              sx={{ flex: "1" }}
              renderOption={(props, option) => (
                <ListItem
                  {...props}
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    fontSize: "0.9rem",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "gray",
                      color: "black"
                    }
                  }}
                >
                  {option.label}
                </ListItem>
              )}
            />
          </div>
          <h2 className="title">Experience</h2>
          <Autocomplete
            placeholder="Employment Status"
            value={
              employment.find((option) => option.label === employmentStatus) ||
              null
            }
            onChange={handleAutocompleteChange(setEmploymentStatus)}
            options={employment}
            sx={{ width: "100%" }}
            renderOption={(props, option) => (
              <ListItem
                {...props}
                sx={{
                  width: "100%",
                  backgroundColor: "white",
                  fontSize: "0.9rem",
                  padding: "8px 16px",
                  "&:hover": {
                    backgroundColor: "gray",
                    color: "black"
                  }
                }}
              >
                {option.label}
              </ListItem>
            )}
          />
          {employmentStatus === "Student and Working" && (
            <div className="hidden">
              <div className="name-inputs">
                <TextField
                  id="job-title"
                  size="small"
                  label="Job Title"
                  value={jobTitle}
                  onChange={handleFieldChange(setJobTitle)}
                  variant="outlined"
                  sx={{
                    flex: 1,
                    "& .MuiInputLabel-root": { fontSize: "0.8rem" }
                  }}
                />
                <TextField
                  id="company"
                  size="small"
                  label="Company"
                  value={company}
                  onChange={handleFieldChange(setCompany)}
                  variant="outlined"
                  sx={{
                    flex: 1,
                    "& .MuiInputLabel-root": { fontSize: "0.8rem" }
                  }}
                />
              </div>
              <TextField
                id="experience"
                size="small"
                label="Years of Experience"
                value={experience}
                onChange={handleFieldChange(setExperience)}
                variant="outlined"
                sx={{
                  width: "100%",
                  "& .MuiInputLabel-root": { fontSize: "0.8rem" }
                }}
              />
            </div>
          )}
          <Button
            variant="outlined"
            color="neutral"
            sx={{ display: "flex", alignSelf: "flex-start", margin: "1rem" }}
          >
            Upload CV
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
          <button className="btn" type="submit" onClick={handleSubmit}>
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

export default Signup2;
