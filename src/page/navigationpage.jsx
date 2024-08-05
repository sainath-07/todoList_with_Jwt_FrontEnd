import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/navbar";
import UserRegister from "../components/userDetails/UserRegister";
import UserLogin from "../components/userDetails/UserLogin";
import Todolist from "../Todolist";

let initialvalue = {
  showUserRegister: false,
  showUserLogin: false,
  showtodoList: false,
  showLogout: false,
};

const reducerfun = (state, action) => {
  switch (action.type) {
    case "UserRegister":
      return {
        ...state,
        showtodoList: false,
        showUserRegister: true,
        showUserLogin: false,
      };

    case "UserLogin":
      return {
        ...state,
        showtodoList: false,
        showUserRegister: false,
        showUserLogin: true,
      };
    case "todoList":
      return {
        ...state,
        showtodoList: true,
        showUserRegister: false,
        showUserLogin: false,
      };

    default:
      return state;
  }
};

const NavigationPage = () => {
  const [currentstate, dispatchfun] = useReducer(reducerfun, initialvalue);
  const [userLogout, setuserLogout] = useState(false);

  useEffect(() => {
    const getLoginToken = localStorage.getItem("loginToken");
    if (getLoginToken) {
      setuserLogout(true);
    }
  }, []);

  const handleUserRegister = () => {
    dispatchfun({
      type: "UserRegister",
    });
    localStorage.clear();
  };

  const handleUserLogin = () => {
    dispatchfun({
      type: "UserLogin",
    });
    localStorage.clear();
  };

  const handleTodolist = () => {
    dispatchfun({
      type: "todoList",
    });
  };

  const handleuserlogout = () => {
    if (window.confirm("Are you sure do you want to logout...?")) {
      setuserLogout(false);
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div>
      <Navbar
        handleUserRegister={handleUserRegister}
        handleUserLogin={handleUserLogin}
        handleuserlogout={handleuserlogout}
        userLogout={userLogout}
        showUserRegister={currentstate.showUserRegister}
      />
      {currentstate.showUserRegister && (
        <UserRegister handleUserLogin={handleUserLogin} />
      )}
      {currentstate.showUserLogin && (
        <UserLogin handleTodolist={handleTodolist} />
      )}

      {currentstate.showtodoList && <Todolist />}
    </div>
  );
};

export default NavigationPage;
