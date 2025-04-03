import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCards from "./UserCards";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "./features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [error, setError] = useState("Invalid credentuials!");
  
  //   const { firstName, lastName, age,photoUrl, gender, about, skills } = user;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [updateStatus, setUpdateStatus] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      toast.success("Profile updated succesfully!", { position: "top-center" });
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  useEffect(() => {
    setError("");
  }, []);
  
  if (!user) return;

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center ">
        <div className="flex justify-center my-15 mx-10">
          <div className="card card-border bg-base-300 w-96  shadow-xl">
            <div className="grid card-body content-around">
              <div><h2 className="card-title ">Edit Profile</h2></div>
              <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend ">First Name:</legend>
                <input
                  type="text"
                  className="input input-sm"
                  placeholder="Enter firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              </div>
              <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend  ">Last Name:</legend>
                <input
                  type="text"
                  className="input input-sm"
                  placeholder="Enter lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              </div>
              <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend  ">Photo URL:</legend>
                <input
                  type="text"
                  className="input input-sm"
                  placeholder="Enter photo url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              </div>
              <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend  ">Age:</legend>
                <input
                  type="text"
                  className="input input-sm"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              </div>
              <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend  ">Gender:</legend>
               
                <div className="dropdown dropdown-start">
                  <input
                  type="text"
                  tabIndex={0} role="button"
                  className="input input-sm  m-1"
                  placeholder="Enter gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box z-1 w-75 ml-3 p-2 shadow-sm"
                  >
                    <li>
                      <a onClick={(e)=> setGender("Male")}>Male</a>
                    </li>
                    <li>
                      <a onClick={(e)=> setGender("Female")}>Female</a>
                    </li>
                    <li>
                      <a onClick={(e)=> setGender("Others")}>Others</a>
                    </li>
                  </ul>
                </div>
              </fieldset>
              </div>
              <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend  ">About:</legend>
                <textarea
                  className="textarea textarea-sm h-20"
                  placeholder="Enter about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
              </div>
              <div className="flex flex-col card-actions ">
                <p className={` text-red-500 justify-start`}>{error}</p>
                <div className="flex justify-center w-full">
                  <button
                    className="btn btn-primary items-center mt-2"
                    onClick={() => handleUpdateProfile()}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UserCards
          user={{ firstName, lastName, age, photoUrl, gender, about }}
        />
      </div>
    </>
  );
};

export default EditProfile;
