import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const HomePage = ({ username }) => {
  return (
    <div>
      <header/>
      <Sidebar />
      <center> <h2>Welcome, {username}!</h2> </center>
      <Footer />
    </div>
  );
};

export default HomePage;
