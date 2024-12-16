import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setuserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setuserData({
      fullName: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    });
    console.log(userData);

    setFirstName("");
    setLastName("");
    setEmail("");
    setpassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-12 mt-3"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your Name ?</h3>
          <div className="flex gap-4 mb-5">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-3 border  text-base placeholder:text-base "
              type="text"
              required
              placeholder="First name"
            />
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eeeeee]  w-1/2  rounded px-4 py-3 border  text-base placeholder:text-sm "
              type="text"
              required
              placeholder="Last name"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your email ?</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-3 border w-full text-base placeholder:text-base "
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-3 border w-full text-lg placeholder:text-base "
            type="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base ">
            Login
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-xs leading-tight">
          By proceeding, you consent to get a calls,whatsApp or SMS messages,
          including by automated means, from Uber ad its affiliates to the Email
          Provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
