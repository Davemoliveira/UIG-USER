import React, { useEffect, useState } from "react"
import apiService from "../services/ApiService"
import useToastMessages from "../hooks/useToastMessages"

function AddEditUser({ data, type, fetchUsers, handleCloseModel }) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const { showToast } = useToastMessages()

  useEffect(() => {
    if (data) {
      setPhoneNumber(data.phoneNumber)
      setEmail(data.email)
      setPassword(data.password)
    }
  }, [data])

  const handleSignup = async () => {
    try {
      // Validate username, email, and password (add more validation as needed)

      // Check if required fields are not empty
      if (type === "EDIT" && (!phoneNumber || !email)) {
        showToast("Please enter username, email", "error")
        return
      }
      if (type !== "EDIT" && (!phoneNumber || !email || !password)) {
        showToast("Please enter username, email, and password", "error")
        return
      }
      let payload = {
        phoneNumber,
        email
      }
      if (type !== "EDIT") {
        payload.password = password
      }

      // Make API request to signup endpoint
      const response =
        type === "EDIT"
          ? await apiService.updateUser(data.id, payload)
          : await apiService.signUp(payload)

      showToast(`${type === "EDIT" ? "Updated" : "Created"} user successfully`)
      if (fetchUsers) {
        fetchUsers()
        handleCloseModel()
      }
      // Optionally, you can trigger a login after signup
      // onLogin(email);
    } catch (error) {
      console.error(" error:", error)
      showToast(
        `Failed to ${type === "EDIT" ? "Update" : "Create"} user`,
        "error"
      )
    }
  }

  return (
    <div className="flex items-center justify-center p-5">
      <div className="p-8 bg-white rounded-md shadow-md relative">
        <div className="text-center mb-6">
          <h1 className="mb-6 text-2xl font-semibold text-gray-800">
            {type === "EDIT" ? "Update User Details" : "Create User"}
          </h1>
        </div>

        <div className=" gap-3 mb-4">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Please Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-1 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {type !== "EDIT" && (
          <div className=" gap-2 mb-4">
            <label htmlFor="">Password:</label>

            <input
              type="password"
              placeholder="Please Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-1 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        )}

        <div className=" gap-2 mb-4">
          <label htmlFor=""> Phone Number :</label>

          <input
            type="text"
            placeholder="Please enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-1 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

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
  )
}

export default AddEditUser