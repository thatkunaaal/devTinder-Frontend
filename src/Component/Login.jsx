import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./features/user/userSlice";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isloginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const [margin, setMargin] = useState("");
  

  const handleSubmit = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {firstName,lastName,emailId,password},{withCredentials: true});
      dispatch(addUser(res.data.data));
      Navigate("/profile");
    } catch (err) {
       toast.error(err.response.data.message, { position: "top-center" });
      console.log(err.response.data.message);
    }
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      Navigate("/");
    } catch (err) {
      setError(err.response.data);
      setMargin("mt-1");
      console.log(err);
    }
  };
  {
    return (
      <>
      <ToastContainer />
      <div className="flex justify-center mt-10">
        <div className="card card-border bg-base-300 w-96  ">
          <div className="card-body">
            <h2 className="card-title">{isloginForm ? "Login" : "Sign Up"}</h2>
            {!isloginForm && (
              <>
                {" "}
                <label className="input my-4">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="text"
                    placeholder="Firstname"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    required
                  />
                </label>
                <label className="input">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="text"
                    value={lastName}
                    required
                    placeholder="Lastname"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </label>{" "}
              </>
            )}
            <label className="input validator my-4">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                required
              />
            </label>
            <label className="input validator ">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                value={password}
                required
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <div className="validator-hint hidden mt-2 ">
              Enter valid email address
            </div>
            <div className="flex flex-col items-center card-actions justify-center">
              <p className={`${margin} text-red-500`}>{error}</p>
              <button
                className="btn btn-primary items-center mt-4"
                onClick={() => isloginForm? handleLogin() : handleSubmit()}
              >
                {isloginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            <div className="w-full text-end text-primary mt-3">
              <span className="underline cursor-pointer underline-offset-2 " onClick={()=> setIsLoginForm(!isloginForm)}>{isloginForm ? "New user? Singup here" : "Exisiting user, login here"}</span>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
};

export default Login;
