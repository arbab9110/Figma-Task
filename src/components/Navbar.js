import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/init";
import { Box, Typography } from "@mui/material";

const Navbar = ({ title }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await auth.currentUser;
      console.log(user, "navUser");
      if (user) {
        try {
          const docRef = doc(db, "Candidate-Form", user.uid);
          const docSnap = await getDoc(docRef);
          console.log(docSnap, "DocSnap");
          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user signed in");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  return (
    <Box
      sx={{
        width: "calc(100% - 240px)",
        height: "60px",
        backgroundColor: "#d8e9e7",
        color: "black",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        position: "fixed",
        top: 0,
        border: "1px solid lightgray",
        left: "240px",
        zIndex: 1201,
        justifyContent: "space-between"
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <div
        className="card-image"
        style={{
          marginLeft: "auto",
          marginRight: "10px",
          backgroundColor: "rgb(232, 197, 123)"
        }}
      ></div>
      {loading ? (
        <Typography variant="h8" sx={{ marginRight: "50px" }}>
          Loading...
        </Typography>
      ) : (
        <Typography variant="h8" sx={{ marginRight: "50px" }}>
          {data?.firstName} {data?.lastName}
        </Typography>
      )}
    </Box>
  );
};

export default Navbar;
