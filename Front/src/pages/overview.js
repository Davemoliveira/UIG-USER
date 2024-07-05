import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DarkModeToggle from "../components/DarkModeToggle"; // Adjust the path as needed
import FontSizeIncreaser from "../components/FontSizeIncreaser"; // Adjust the path as needed
import ToggleButton from "../components/ToggleButton";
import TwoColumnGrid from "../components/TwoColumnGrid";
import { Card, CardBody } from "@windmill/react-ui";
import PortDisplay from "../components/PortDisplay";
import NetworkInfoDisplay from "../components/NetworkInfoDisplay";
import CheckReactV from "../components/CheckReactV";
import NetworkIP from "../components/NetworkIP";
import { version } from "react";
import ReactVersion from "../components/ReactVersion";
import ServerPort from "../components/ServerPort";
import AWS_health from "../components/AWS_health";
import AZU_health from "../components/AZU_health";
import GCP_health from "../components/GCP_health";

import JavaVersionFetcher from "../components/JavaVersionFetcher";

// Retrieve the port number from an environment variable or set a default port
const port = process.env.REACT_APP_PORT || window.location.port;

const Overview = () => {
  const [isExpanded, setIsExpanded] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex">
      <Sidebar isExpanded={isExpanded} />
      <div className={`flex-1 ${isExpanded ? "ml-64" : "ml-16"}`}>
        <div className="flex justify-center">
          <div className="w-full max-w-screen-lg px-4">
            <div className="pt-20">
              <div className="px-20">
                <div className="slide-in">
                  <Card>
                    <CardBody>
                      <p className="mb-4 text-2xl font-semibold text-center text-gray-600 dark:text-gray-600">
                        OVERVIEW
                      </p>
                      <hr></hr>
                    </CardBody>
                  </Card>

                  <ul class="flex flex-col md:grid grid-cols-3 gap-5 text-redis-neutral-800 max-w-5xl mx-auto p-10 text-center">
                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">
                        APPLICATION PORT
                      </span>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                        <PortDisplay port={port} />
                      </span>
                    </li>

                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">DATABASE PORT</span><br/><br/>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                        <p>8081</p>
                      </span>
                    </li>

                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">
                        NETWORK STATUS
                      </span>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                        <NetworkInfoDisplay />
                      </span>
                    </li>

                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">REACT VERSION</span>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                        <ReactVersion />
                      </span>
                    </li>

                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">JAVA VERSION</span><br/>
                       <p>21</p>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                      </span>
                    </li>

                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">NETWORK IP</span>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                        {" "}
                        <NetworkIP />{" "}
                      </span>
                    </li>

                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">
                        AWS HEALTH STATUS
                      </span>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                        {" "}
                        <AWS_health />{" "}
                      </span>
                    </li>

                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">
                        AZURE HEALTH STATUS
                      </span>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                        {" "}
                        <AZU_health />{" "}
                      </span>
                    </li>

                    <li class="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center">
                      <span className="text-base font-bold">
                        GCP HEALTH STATUS
                      </span>
                      <span class="mb-1 text-indigo-800 font-display text-5xl">
                        {" "}
                        <GCP_health />{" "}
                      </span>
                    </li>
                  </ul>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Overview;
