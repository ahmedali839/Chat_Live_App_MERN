import React from "react";
import ChatWindow from "./ChatWindow";
import { Navigate, replace } from "react-router-dom";

const Dashboard = () => {
  const userID = localStorage.getItem("trtc_userID");
  if (!userID) {
    return Navigate("/login", replace);
  }
  return (
    <div className="h-screen w-full overflow-hidden bg-white">
      <main className="h-full w-full">
        <ChatWindow />
      </main>
    </div>
  );
};

export default Dashboard;
