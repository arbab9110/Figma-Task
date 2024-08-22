import React, { useEffect, useState } from "react";
import "./CourseSelect.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/init";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};
const CourseSelect = () => {
  const [data, setData] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const a = auth.currentUser;
  useEffect(() => {
    (async () => {
      const docRef = doc(db, "Candidate-Form", a?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="left-section">
        <img src="./undraw_happy_news_re_tsbd 1.png" alt="Join Now" />
        <h2>Join Now</h2>
        <p>Just a couple of clicks and we start</p>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      <div className="right-section">
        <div className="course-content">
          <h1>Course Selection</h1>
          <p>
            {data?.firstName} {data?.lastName}
          </p>
          <p>{data?.email}</p>

          <h2>Courses</h2>
          <p>Select one course you want to apply for</p>
          <div className="card-container">
            <div className="course1">
              <div className="course1-header">
                <div className="course1-image"></div>
                <h3 className="course1-title">Title</h3>
              </div>
              <div className="course1-body">
                <p className="course1-duration">Duration: 12 Weeks</p>
                <p className="course1-start-date">Start Date: </p>
                <button className="course1-button" onClick={handleOpen}>
                  Select
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box
                    sx={{
                      ...style,
                      width: "50%",
                      borderRadius: 5,
                      textAlign: "center",
                      border: "none",
                      backgroundColor: "rgb(166, 159, 159)"
                    }}
                  >
                    <h2 id="parent-modal-title">Privacy Policy</h2>
                    <p id="parent-modal-description">
                      In the contemporary digital landscape, the importance of
                      safeguarding personal information cannot be overstated. A
                      comprehensive privacy policy is essential to ensuring
                      users' trust and confidence in any service or application.
                      This essay elucidates the fundamental principles and
                      practices that constitute an effective privacy policy,
                      highlighting the need for transparency, security, and user
                      control. A cornerstone of any robust privacy policy is
                      transparency. Users must be fully informed about what data
                      is being collected, how it is used, and for what purposes.
                      This includes a clear explanation of the types of personal
                      information gathered, such as names, email addresses, and
                      payment details. Additionally, it is crucial to disclose
                      any third parties with whom this data may be shared,
                      ensuring users are aware of all entities involved in
                      handling their information. Furthermore, the policy should
                      articulate the legal basis for data processing, whether it
                      be consent, contract, legal obligation, or legitimate
                      interest. Providing this information in a straightforward,
                      accessible language fosters trust and allows users to make
                      informed decisions about their data. Protecting users'
                      data from unauthorized access, breaches, and other
                      security threats is paramount. A privacy policy must
                      outline the security measures implemented to safeguard
                      personal information. This encompasses technical
                      protections such as encryption, firewalls, and secure
                      servers, as well as organizational practices like regular
                      security audits and employee training. Empowering users
                      with control over their personal information is a critical
                      aspect of a privacy policy.
                    </p>
                  </Box>
                </Modal>
              </div>
            </div>
            <div className="course1">
              <div className="course1-header">
                <div className="course1-image"></div>
                <h3 className="course1-title">Title</h3>
              </div>
              <div className="course1-body">
                <p className="course1-duration">Duration: 12 Weeks</p>
                <p className="course1-start-date">Start Date: </p>
                <button className="course1-button" onClick={handleOpen}>
                  Select
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box
                    sx={{
                      ...style,
                      width: "50%",
                      borderRadius: 5,
                      textAlign: "center",
                      border: "none",
                      backgroundColor: "rgb(166, 159, 159)"
                    }}
                  >
                    <h2 id="parent-modal-title">Privacy Policy</h2>
                    <p id="parent-modal-description">
                      In the contemporary digital landscape, the importance of
                      safeguarding personal information cannot be overstated. A
                      comprehensive privacy policy is essential to ensuring
                      users' trust and confidence in any service or application.
                      This essay elucidates the fundamental principles and
                      practices that constitute an effective privacy policy,
                      highlighting the need for transparency, security, and user
                      control. A cornerstone of any robust privacy policy is
                      transparency. Users must be fully informed about what data
                      is being collected, how it is used, and for what purposes.
                      This includes a clear explanation of the types of personal
                      information gathered, such as names, email addresses, and
                      payment details. Additionally, it is crucial to disclose
                      any third parties with whom this data may be shared,
                      ensuring users are aware of all entities involved in
                      handling their information. Furthermore, the policy should
                      articulate the legal basis for data processing, whether it
                      be consent, contract, legal obligation, or legitimate
                      interest. Providing this information in a straightforward,
                      accessible language fosters trust and allows users to make
                      informed decisions about their data. Protecting users'
                      data from unauthorized access, breaches, and other
                      security threats is paramount. A privacy policy must
                      outline the security measures implemented to safeguard
                      personal information. This encompasses technical
                      protections such as encryption, firewalls, and secure
                      servers, as well as organizational practices like regular
                      security audits and employee training. Empowering users
                      with control over their personal information is a critical
                      aspect of a privacy policy.
                    </p>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>

          <button className="btn" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>

          <p className="small_txt">
            Already a member?{" "}
            <span>
              <Link>Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseSelect;
