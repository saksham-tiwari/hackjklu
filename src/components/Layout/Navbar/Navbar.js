import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import illustrate from "../../Assets/vodacom-logo.png";
import "./Navbar.css";
import { FaSignOutAlt, FaQrcode } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import englishFlag from "../../Assets/english-flag.png";
import portugueseFlag from "../../Assets/portuguese-flag.png";
import frenchFlag from "../../Assets/french-flag.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("English");

  const signingOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const qrScan = () => {
    navigate("/qrcode");
  };

  const logoClick = () => {
    navigate("/");
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Add any additional logic for changing the language here
  };

  return (
    <div className="Navbar">
      <div className="logo" onClick={logoClick}>
        <div className="logo-image">
          <img className="image" src={illustrate} alt="logo" />
        </div>

        <div className="logo-head">
          <p>Vodacom</p>
        </div>
      </div>

      <div className="Nav-menu">
        <div className="qr-code" style={{ order: "1" }} onClick={qrScan}>
          <FaQrcode
            style={{ color: "#192839", fontSize: "2.2em", cursor: "pointer" }}
          />
        </div>

        <div className="sign-out" style={{ order: "2" }} onClick={signingOut}>
          <FaSignOutAlt
            style={{ color: "#192839", fontSize: "2.2em", cursor: "pointer" }}
          />
        </div>

        <div className="language-dropdown" style={{ order: "3" }}>
          <div className="dropdown">
            <button className="dropbtn">
              <img
                src={
                  language === "English"
                    ? englishFlag
                    : language === "Portuguese"
                    ? portugueseFlag
                    : frenchFlag
                }
                alt={language}
                className="flag"
              />
              {language} <IoMdArrowDropdown />
            </button>
            <div className="dropdown-content">
              <div onClick={() => changeLanguage("EN")}>
                <img src={englishFlag} alt="English" className="flag" /> English
              </div>
              <div onClick={() => changeLanguage("PT")}>
                <img src={portugueseFlag} alt="Portuguese" className="flag" />{" "}
                Portuguese
              </div>
              <div onClick={() => changeLanguage("FR")}>
                <img src={frenchFlag} alt="French" className="flag" /> French
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
