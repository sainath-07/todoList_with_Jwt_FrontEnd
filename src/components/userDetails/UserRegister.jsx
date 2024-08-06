import React, { useState } from "react";
import { baseurl } from "../../utils/Api_integration";
import Swal from "sweetalert2";

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
          timer: 1500,
        });
        handleUserLogin(true);
        setname("");
        setemail("");
        setpassword("");
        const username = data.newUser.name;
        localStorage.setItem("name", username);
      } else {
        alert("Some thing went wrong try-again");
      }
    } catch (error) {
      console.error(error, "registration failed");
    }
  };
  let Poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontStyle: "normal",
  };
  return (
    <div className="h-[70vh]">
      <form action="" onSubmit={handleRegister}>
        <h1 className="text-center mt-6 text-2xl"
         style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          fontStyle: "normal",
        }}
        >User Signup form</h1>
        <div
          className="flex flex-col w-1/2 gap-4
          items-center mx-auto justify-start mt-5
          h-1/2"
        >
          <input
            type="text"
            value={name}
            name="name"
            autoComplete="off"
            style={Poppins}
            onChange={(e) => setname(e.target.value)}
            className="w-1/2 border-2 border-gray-300 p-2 text-2xl"
            placeholder="Name"
          />
          <input
            type="text"
            value={email}
            name="email"
            autoComplete="off"
            style={Poppins}
            onChange={(e) => setemail(e.target.value)}
            className="w-1/2 border-2 border-gray-300 p-2 text-2xl"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            name="password"
            autoComplete="off"
            style={Poppins}
            onChange={(e) => setpassword(e.target.value)}
            className="w-1/2 border-2 border-gray-300 p-2 text-2xl"
            placeholder="Password"
          />
        </div>
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 px-4 text-xl rounded border border-none"
            style={{
              Poppins,
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
