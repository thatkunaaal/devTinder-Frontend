import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch ,useSelector} from "react-redux";
import { addUser, removeUser } from "./features/user/userSlice";

const Body = () => {
  const disaptch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.user.value);
  
  const fetchUser = async () => {
    if(userData) return true
    try {
      
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      disaptch(addUser(res.data));
      navigate("/");
    } catch (err) {
      if(err.status === 401)
      {
        navigate("/login");
      }
      else
        {
          console.log(err);
        }
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
