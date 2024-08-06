import React, { useEffect, useReducer, useState } from "react";
import Navbar from "../components/navbar";
import UserRegister from "../components/userDetails/UserRegister";
import UserLogin from "../components/userDetails/UserLogin";
import Todolist from "../Todolist";
import Swal from "sweetalert2";
import img from "./todoimage.jpg";

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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Do you Want to logout......!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout!",
        margin: "10px",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "success!",
            text: "Logout is successfully",
            icon: "success",
          });
          setuserLogout(false);
          localStorage.clear();
          window.location.reload();
        }
      });
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

      {currentstate.showUserRegister ||
      currentstate.showUserLogin ||
      currentstate.showtodoList ? (
        ""
      ) : (
        <>
          <div className="flex  justify-center  items-center h-[90vh]">
            <img src={img} alt="" className=" h-[80%] rounded" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}} />
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationPage;
