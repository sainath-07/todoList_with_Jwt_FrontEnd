import React, { useState } from "react";
import { baseurl } from "../../utils/Api_integration";

const UserRegister = ({ handleUserLogin }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseurl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
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
          title: "SignUp is successfully, Now you can login",
          showConfirmButton: false,
          timer: 1500
        });
        handleUserLogin(true);
        setname("");
        setemail("");
        setpassword("");
        const username=data.newUser.name
        localStorage.setItem('name',username)
      } else {
        alert("Some thing went wrong try-again");
      }
    } catch (error) {
      console.error(error, "registration failed");
    }
  };

  return (
    <div className="h-[70vh]">
      <form action="" onSubmit={handleRegister}>
        <h1 className="text-center mt-6 text-2xl">User Signup From</h1>
        <div
          className="flex flex-col w-1/2 gap-4
          items-center mx-auto justify-start mt-5
          h-1/2"
        >
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setname(e.target.value)}
            className="w-1/2 border-1 border-gray-700 p-2"
            placeholder="Name"
          />
          <input
            type="text"
            value={email}
            name="email"
            onChange={(e) => setemail(e.target.value)}
            className="w-1/2 border-1 border-gray-700 p-2"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setpassword(e.target.value)}
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

export default UserRegister;
