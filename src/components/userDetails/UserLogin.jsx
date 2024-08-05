import React, { useState } from "react";
import { baseurl } from "../../utils/Api_integration";
import Swal from 'sweetalert2';

const UserLogin = ({ handleTodolist }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseurl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data, "data");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You have Logged in successfully",
        showConfirmButton: false,
        timer: 1500
      });
      localStorage.setItem("loginToken", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", data.email);
      handleTodolist();
      setemail("");
      setpassword("");
    } else {
      alert("Something went wrong try-again");
    }
  };

  return (
    <div className="h-[70vh]">
      <form action="" onSubmit={handleLogin}>
        <h1 className="text-center mt-6 text-2xl">Login form</h1>
        <div
          className="flex flex-col w-1/2 gap-4
              items-center mx-auto justify-start mt-5
              h-1/2"
        >
          <input
            type="text"
            className="w-1/2 border-1 border-gray-700 p-2"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            value={password}
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="w-1/2 border-1 border-gray-700 p-2"
            placeholder="Password"
          />
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
