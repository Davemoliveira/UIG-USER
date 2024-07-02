import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import DarkModeToggle from "../components/DarkModeToggle"; // Adjust the path as needed
import FontSizeIncreaser from "../components/FontSizeIncreaser"; // Adjust the path as needed
import ToggleButton from "../components/ToggleButton";
import TwoColumnGrid from "../components/TwoColumnGrid";
import { Card, CardBody } from "@windmill/react-ui";
import Usertable from "../components/Usertable";
import apiService from "../services/ApiService";
import CommonModal from "../components/CommonModal";
import AddEditUser from "../components/AddEditUser";

const Users = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State to control sidebar visibility
  const [userList, setUserList] = useState([]);
  const [model, setModel] = useState(false);

  const handleCloseModel = () => {
    setModel(false);
  };

  const fetchUsers = async () => {
    try {
      // Call the getAllUsers API with the provided token
      const usersData = await apiService.getAllUsers();
      if (usersData && usersData.length > 0) {
        setUserList(usersData);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    fetchUsers(); // Call the fetchUsers function to fetch user data
  }, []);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      <Sidebar isExpanded={isExpanded} />
      <div
        style={{ paddingBottom: "2%" }}
        className={`flex-1 ${isExpanded ? "ml-64" : "ml-16"}`}
      >
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg px-4">
            <div className="pt-20">
              <div className="max-w-2xl mx-auto p-10 relative">
                <button
                  onClick={() => {
                    setModel(true);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded absolute top-0 right-0"
                >
                  Create User
                </button>
              </div>
              <div className="px-20">
                <div className="slide-in">
                  <Card>
                    <CardBody>
                      <p className="mb-4 text-2xl font-semibold text-center text-gray-600 dark:text-gray-600">
                        USERS
                      </p>

                      <hr></hr>
                      <br></br>

                      <Usertable userList={userList} fetchUsers={fetchUsers} />
                      {/* <ul class="flex flex-col md:grid grid-cols-3 gap-5 text-redis-neutral-800 max-w-2xl mx-auto p-10 text-center">
                        <li
                          class="w-full text-sm font-semibold text-slate-900 bg-white border border-slate-700/10 bg-clip-padding shadow-md shadow-slate-900/5 flex flex-col justify-center">
                          <span class="mb-1 text-indigo-800 font-display text-l"><button>Create User</button></span>
                        </li>

                        <li
                          class="w-full text-sm font-semibold text-slate-900 bg-white border border-slate-700/10 bg-clip-padding shadow-md shadow-slate-900/5 flex flex-col justify-center">
                          <span class="mb-1 text-indigo-800 font-display text-l"><button>Modify User</button></span>
                        </li>

                        <li
                          class="w-full text-sm font-semibold text-slate-900 bg-white border border-slate-700/10 bg-clip-padding shadow-md shadow-slate-900/5 flex flex-col justify-center">
                          <span class="mb-1 text-indigo-800 font-display text-l"><button>Delete User</button></span>
                        </li>
                      </ul> */}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {model && (
        <CommonModal
          handleClose={handleCloseModel}
          open={model}
          title={"Edit"}
          content={
            <AddEditUser
              data={null}
              type={"CREATE"}
              fetchUsers={fetchUsers}
              handleCloseModel={handleCloseModel}
            />
          }
          size="xs"
        />
      )}
    </div>
  );
};

export default Users;