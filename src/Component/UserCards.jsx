import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import status from "daisyui/components/status";
import { useDispatch } from "react-redux";
import { removeParticularFeed } from "./features/feed/feedSlice";

const UserCards = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequests = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeParticularFeed(_id));
    } catch (err) {}
  };

  return (
    <div className="flex justify-center ">
      <div className="card bg-base-300 flex w-96 my-17 shadow-sm">
        <figure className="h-120">
          <img
            src={user.photoUrl}
            style={{ objectFit: "cover", height: "100vh", width: "100%" }}
            alt="Profile"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{`${age}, ${gender}`}</p>}

          <p>{about}</p>
          {skills && skills.length > 0 && <p>Skills: {...skills}</p>}
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary mr-10" onClick={()=> handleSendRequests("ignored",_id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=> handleSendRequests("interested",_id)}>Interest</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
