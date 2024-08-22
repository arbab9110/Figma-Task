import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import "./Setting.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/init";
import Autocomplete from "@mui/joy/Autocomplete";
import ListItem from "@mui/joy/ListItem";
import { styled } from "@mui/joy";

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
  { label: "2024" },
  { label: "2025" }
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
const Account = () => {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    registerAs: "",
    Number: "",
    DateOfBirth: "",
    CNIC: "",
    City: "",
    Address: "",
    Education: "",
    StartingYear: "",
    EndingYear: "",
    EmploymentStatus: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const docRef = doc(db, "Candidate-Form", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocompleteChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "Candidate-Form", auth.currentUser.uid);
      await updateDoc(docRef, data);
      alert("Data Updated Successfully");
      setEdit(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Error updating data. Please try again.");
    }
  };

  const register = [{ label: "Employee" }, { label: "Candidate" }];

  return (
    <div className="box">
      <div className="list">
        <h4>On This Page</h4>
        <p>- Personal Information</p>
        <p>- Education</p>
        <p>- Experience</p>
        <p>- Tracks</p>
      </div>
      <div className="account">
        <form onSubmit={handleSubmit}>
          <div className="edit">
            <h1>Personal Information</h1>
            {!edit && (
              <p className="edit-btn" onClick={() => setEdit(true)}>
                Edit <MdOutlineModeEdit />
              </p>
            )}
          </div>
          <div className="name-inputs">
            <TextField
              size="small"
              name="firstName"
              value={data.firstName}
              variant="outlined"
              onChange={handleUpdate}
              InputProps={{ readOnly: !edit }}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              name="lastName"
              value={data.lastName}
              variant="outlined"
              onChange={handleUpdate}
              InputProps={{ readOnly: !edit }}
              sx={{ flex: 1 }}
            />
          </div>
          <TextField
            size="small"
            name="email"
            value={data.email}
            variant="outlined"
            onChange={handleUpdate}
            InputProps={{ readOnly: !edit }}
            sx={{ width: "100%" }}
          />

          <div className="gender-inputs">
            <label>Gender</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleUpdate}
                checked={data.gender === "male"}
                disabled={!edit}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleUpdate}
                checked={data.gender === "female"}
                disabled={!edit}
              />
              Female
            </label>
          </div>

          <div className="register-input">
            <Autocomplete
              placeholder="Register As"
              value={
                register.find((option) => option.label === data.registerAs) ||
                null
              }
              onChange={(e, newValue) =>
                handleAutocompleteChange("registerAs", newValue?.label || "")
              }
              options={register}
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Register As"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: !edit
                  }}
                />
              )}
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

          <h1> Personal Information</h1>
          <div className="name-inputs">
            <TextField
              size="small"
              name="Number"
              value={data.Number}
              variant="outlined"
              onChange={handleUpdate}
              InputProps={{ readOnly: !edit }}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              name="DateOfBirth"
              value={data.DateOfBirth}
              variant="outlined"
              onChange={handleUpdate}
              InputProps={{ readOnly: !edit }}
              sx={{ flex: 1 }}
            />
          </div>
          <TextField
            size="small"
            name="CNIC"
            value={data?.CNIC}
            variant="outlined"
            onChange={handleUpdate}
            InputProps={{
              readOnly: !edit
            }}
            sx={{ flex: 1, width: "100%" }}
          />
          <div className="name-inputs">
            <Autocomplete
              placeholder="City"
              value={city.find((option) => option.label === data.City) || null}
              onChange={(e, newValue) =>
                handleAutocompleteChange("City", newValue?.label || "")
              }
              options={city}
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="City"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: !edit
                  }}
                />
              )}
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
              size="small"
              name="Address"
              value={data?.Address}
              variant="outlined"
              onChange={handleUpdate}
              InputProps={{
                readOnly: !edit
              }}
              sx={{ flex: 1 }}
            />
          </div>
          <h1>Education</h1>
          <Autocomplete
            placeholder="Level of Education"
            value={
              education.find((option) => option.label === data.Education) ||
              null
            }
            onChange={(e, newValue) =>
              handleAutocompleteChange("Education", newValue?.label || "")
            }
            options={education}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Level of Education"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  readOnly: !edit
                }}
              />
            )}
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
                year.find((option) => option.label === data.StartingYear) ||
                null
              }
              onChange={(e, newValue) =>
                handleAutocompleteChange("StartingYear", newValue?.label || "")
              }
              options={year}
              sx={{ flex: "1" }}
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Starting Year"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: !edit
                  }}
                />
              )}
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
              value={
                year.find((option) => option.label === data.EndingYear) || null
              }
              onChange={(e, newValue) =>
                handleAutocompleteChange("EndingYear", newValue?.label || "")
              }
              options={year}
              sx={{ flex: "1" }}
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Ending Year"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: !edit
                  }}
                />
              )}
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
          <h1>Experience</h1>

          <Autocomplete
            placeholder="Employment Status"
            value={
              employment.find(
                (option) => option.label === data.EmploymentStatus
              ) || null
            }
            onChange={(e, newValue) =>
              handleAutocompleteChange(
                "EmploymentStatus",
                newValue?.label || ""
              )
            }
            options={employment}
            sx={{ width: "100%" }}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Employment Status"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  readOnly: !edit
                }}
              />
            )}
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

          <Button
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            sx={{
              display: "flex",
              alignSelf: "flex-start",
              margin: "1rem",
              color: "green"
            }}
          >
            Upload CV
            <VisuallyHiddenInput type="file" />
          </Button>
          <h1>Tracks</h1>
          <div className="cards">
            <div className="cardleave">
              <div className="card1-header1">
                <div className="card1-image1"></div>
                <h3 className="card1-title1">Title</h3>
              </div>
              <div className="card1-body1">
                <div>
                  <p className="card1-duration1">Duration: 12 Weeks</p>
                  <p className="card1-start-date1">Start Date: </p>
                </div>
                <button className="card1-button1">Leave Track</button>
              </div>
            </div>
            <div className="cardleave">
              <div className="card1-header1">
                <div className="card1-image1"></div>
                <h3 className="card1-title1">Title</h3>
              </div>
              <div className="card1-body1">
                <div>
                  <p className="card1-duration1">Duration: 12 Weeks</p>
                  <p className="card1-start-date1">Start Date: </p>
                </div>
                <button className="card1-button1">Leave Track</button>
              </div>
            </div>
          </div>
          {edit && (
            <>
              <button type="submit" className="change">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Account;
