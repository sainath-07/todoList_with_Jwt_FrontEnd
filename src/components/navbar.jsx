import React from "react";

const Navbar = ({ handleUserRegister, handleUserLogin, handleuserlogout }) => {
  const getuseremail = localStorage.getItem("email") || "";
  const loginToken = localStorage.getItem("loginToken");

  let Poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
  };
  return (
    <div
      className="flex justify-between
     h-16 items-center bg-red-500 text-white
    "
    >
      <div className="text-2xl font-semibold ml-6" style={Poppins}>
        TodoList App
      </div>
      <div>
        {loginToken && (
          <span className="text-xl border-b-2 p-2 font-semibold"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontStyle: "normal",
          }}>
           User Email Id : {getuseremail}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {getuseremail ? (
          <span
            className="text-xl border-2 p-2 font-semibold cursor-pointer mr-6"
            onClick={handleuserlogout}
          >
            LogOut
          </span>
        ) : (
          <>
            <span
              className="text-xl border-2 p-2 font-semibold cursor-pointer"
              style={Poppins}
              onClick={handleUserLogin}
            >
              Login
            </span>
            <span
              className="text-xl border-2 p-2 font-semibold cursor-pointer mr-4"
              style={Poppins}
              onClick={handleUserRegister}
            >
              Register
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
