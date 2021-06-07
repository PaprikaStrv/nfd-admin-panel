import React from "react";
import LoginFormContainer from "./../../Components/LoginForm/LoginFormContainer";
import Cookies from "js-cookie";
import AdminPage from "../AdminPage/AdminPage";

const StartPage = () => {
  // Cookies.remove('userToken')
  return (
    <div>
      {Cookies.get("userToken") ? <AdminPage /> : <LoginFormContainer />}
    </div>
  );
};

export default StartPage;