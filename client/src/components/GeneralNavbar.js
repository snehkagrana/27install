import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import logo from "../images/logo.jpeg";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";

const GeneralNavbar = ({ proprole }) => {
    const [showBasic, setShowBasic] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // You can store the dark mode preference in local storage or a state management system like Redux
    };

    const navigate = useNavigate();

    return (
        <MDBNavbar expand="lg" dark style={{ backgroundColor: "#28a745" }}>
            <MDBContainer fluid>
                <MDBNavbarBrand onClick={() => navigate(`/`)}>
                    <span style={{ fontWeight: "bold" }}>Fingo</span>
                </MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setShowBasic(!showBasic)}>
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                        <MDBNavbarItem>
                            <MDBNavbarLink
                                onClick={() => navigate(`/`)}
                                style={{
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    cursor: "pointer",
                                }}>
                                Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink
                                onClick={() => navigate(`/auth/login`)}
                                style={{
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    cursor: "pointer",
                                }}>
                                Login
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink
                                onClick={() => navigate(`/auth/register`)}
                                style={{
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    cursor: "pointer",
                                }}>
                                Register
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink
                                onClick={() => navigate(`/contactus`)}
                                style={{
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    cursor: "pointer",
                                }}>
                                Contact Us
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {/* <MDBNavbarItem>
              <MDBNavbarLink onClick = {()=> navigate(`/aboutus`)} style={{fontWeight: 'bold', color: "#ffffff", cursor: "pointer"}}>About Us</MDBNavbarLink>
            </MDBNavbarItem> */}
                        <MDBNavbarItem>
                            <MDBNavbarLink
                                onClick={() => navigate(`/terms`)}
                                style={{
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    cursor: "pointer",
                                }}>
                                Terms
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink
                                onClick={() => navigate(`/privacypolicy`)}
                                style={{
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                    cursor: "pointer",
                                }}>
                                Privacy Policy
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};
export default GeneralNavbar;
