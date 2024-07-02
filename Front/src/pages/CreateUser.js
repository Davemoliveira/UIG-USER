import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import apiService from "../services/ApiService";

function CreateUser() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSignup = async () => {
    try {
      // Validate username, email, and password (add more validation as needed)

      // Check if required fields are not empty
      if (!phoneNumber || !email || !password) {
        alert("Please enter username, email, and password");
        return;
      }
      let payload = {
        phoneNumber,
        email,
        password,
        // roleName : {role}
      };

      // Make API request to signup endpoint
      const response = await apiService.signUp(payload);

      // Handle successful signup (e.g., store token, redirect, etc.)
      console.log("Create user successful:", response.data);
      // Optionally, you can trigger a login after signup
      // onLogin(email);
    } catch (error) {
      console.error(" error:", error);
      alert(" failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-md shadow-md relative">
        <div className="text-center mb-6">
          <h1 className="mb-6 text-2xl font-semibold text-gray-800">
            Create User
          </h1>
        </div>

        <div className="flex gap-2 mb-4">
          <label> Email :</label>
          <input
            type="email"
            placeholder="Please Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-1 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <label htmlFor=""> Password :</label>

          <input
            type="password"
            placeholder="Please Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-1 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <label htmlFor=""> Phone Number :</label>

          <input
            type="text"
            placeholder="Please enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-1 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* <div className="mb-4">
            <input
              type="text"
              placeholder="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-1 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div> */}

        <div className="mb-4">
          <button
            onClick={handleSignup}
            className="w-full px-4 py-1 font-semibold text-white transition duration-300 bg-black rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;