import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import "./index.css"
import App from "./App"

import reportWebVitals from "./reportWebVitals"
import { AuthContextProvider } from "./context/AuthContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
      <Toaster
        containerStyle={{ zIndex: "9999999999" }}
        position="top-center"
        reverseOrder={false}
      />
    </AuthContextProvider>
  </BrowserRouter>
)
reportWebVitals()
