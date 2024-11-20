"use client";
import React from "react";
import LoginForm from "../components/LoginForm";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  return (
    <div>
      <NavBar />
      <main>
        <LoginForm />
      </main>
    </div>
  );
};

export default Home;
