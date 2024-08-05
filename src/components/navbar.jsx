import React from "react";

const Navbar = ({
  handleUserRegister,
  handleUserLogin,
  handleuserlogout,
  userLogout,
  showUserRegister,
}) => {
  const getuseremail = localStorage.getItem("email") || "";
  const loginToken = localStorage.getItem("loginToken");
  return (
    <div
      className="flex justify-between
     h-16 items-center bg-red-500 text-white
    "
    >
      <div className="text-2xl font-semibold ml-6">TodoList App</div>
      <div>
        {loginToken &&  (
          <span className="text-xl border-b-2 p-2 font-semibold">
            Email Id : {getuseremail}
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
              onClick={handleUserLogin}
            >
              Login
            </span>
            <span
              className="text-xl border-2 p-2 font-semibold cursor-pointer mr-4"
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
