// src/App.js
import React, { useEffect } from "react"
import { useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom"

// Components
import LoginModal from "./LoginModal"

// Pages
import Overview from "./pages/overview"
import Charts from "./pages/charts"
import Cli from "./pages/cli"
import Users from "./pages/users"
import Companies from "./pages/companies"
import Admin_settings from "./pages/admin_settings"

import HomePage from "./HomePage"
import Page2 from "./components/Page2"
import Signup from "./pages/Signup"
import CreateUser from "./pages/CreateUser"
import { useAuthentication } from "./hooks/useAuthentication"

const App = () => {
  const [username, setUsername] = React.useState("")
  const { setUserLoggedIn, userLoggedIn, isAdmin } = useAuthentication()

  const handleLogin = (username) => {
    setUserLoggedIn(true)
    setUsername(username)
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserLoggedIn(true)
    } else {
      setUserLoggedIn(false)
    }
  }, [])

  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          {userLoggedIn ? (
            <HomePage username={username} />
          ) : (
            <LoginModal onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/signin">
          <LoginModal onLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        {userLoggedIn ? (
          <>
            <Route path="/createuser">
              {" "}
              <CreateUser />{" "}
            </Route>

            <Route path="/page2">
              {" "}
              <Page2 />{" "}
            </Route>
            <Route path="/overview">
              {" "}
              <Overview />{" "}
            </Route>
            <Route path="/Charts">
              {" "}
              <Charts />{" "}
            </Route>
            <Route path="/Cli">
              {" "}
              <Cli />{" "}
            </Route>
            {isAdmin ? (
              <Route path="/Users">
                <Users />
              </Route>
            ) : (
              <></>
            )}
            <Route path="/Companies">
              {" "}
              <Companies />{" "}
            </Route>
            <Route path="/Admin_settings">
              {" "}
              <Admin_settings />
            </Route>
          </>
        ) : (
          <></>
        )}

        {/* Default redirect */}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}

export default App
