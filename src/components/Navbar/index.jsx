import React from "react";
import LoginButton from "../Login";
import LogoutButton from "../Logout";

export default function Navbar() {
  return (
    <div className="navbar">
      After Action Review - Lessons Learned Central
      <LoginButton />
      <LogoutButton />
    </div>
  );
};