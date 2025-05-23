import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "./features/user/userSlice";
import { removeFeed } from "./features/feed/feedSlice";
import { removeConnections } from "./features/connections/connectionSlice";
import { removeRequest } from "./features/requests/requestSlice";
import tick from "../utils/Twitter_Verified_Badge.svg";
import {
  makePremiumUser,
  removePremium,
} from "./features/premiumUser/premiumUserSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isUserPremium = useSelector((state) => state.premiumUser.value);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      // console.log(res.data);
      if (res.data.isPremium) dispatch(makePremiumUser());
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequest());
      dispatch(removePremium());
      navigate("login");
    } catch (error) {
      console.log("Error: " + error);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm  ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🧑‍💻 DevTinder
        </Link>
      </div>
      {/* <SwitchTheme /> */}
      {user && (
        <div className="flex gap-2 items-center">
          <div className="flex justify-center">
            <p className=" mr-2">Welcome, {user.firstName}</p>
            {isUserPremium ? (
              <img src={tick} style={{ height: "25px" }} alt="logo" />
            ) : (
              ""
            )}
          </div>
          <div className="dropdown dropdown-end mx-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between"
                  onClick={(e) => e.currentTarget.blur()}
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" onClick={(e) => e.currentTarget.blur()}>
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" onClick={(e) => e.currentTarget.blur()}>
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" onClick={(e) => e.currentTarget.blur()}>
                  Premium
                </Link>
              </li>
              <li>
                <Link
                  onClick={async (e) => {
                    e.currentTarget.blur();
                    await handleLogout();
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
