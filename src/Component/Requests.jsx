import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequest,
  removeParticularRequest,
} from "./features/requests/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const userRequests = useSelector((state) => state.requests.value);

  const handleRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeParticularRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    getRequest();
  }, []);

  if (!userRequests  )
    return <div className="text-xl text-center mt-20">No requests found.</div>;

  return (
    <div className="grid justify-items-center my-10">
      <div className="font-mono text-bold text-3xl ">your requests: </div>
      {userRequests &&
        userRequests.map((request) => (
          <div key={request?.fromUserId?._id}>
            <div className="card card-side bg-base-300 w-190 h-70 shadow-sm my-5">
              <figure>
                <div className="w-70">
                  <img
                    src={request.fromUserId.photoUrl}
                    className="w-full "
                    style={{ objectFit: "cover" }}
                    alt="Movie"
                  />
                </div>
              </figure>
              <div className="card-body w-110 h-auto">
                <h2 className="card-title">
                  {request.fromUserId.firstName +
                    " " +
                    request.fromUserId.lastName}
                </h2>
                {request.fromUserId.age && request.fromUserId.gender && (
                  <p>
                    {request.fromUserId.age + ", " + request.fromUserId.gender}
                  </p>
                )}
                <p>{request.fromUserId.about}</p>
                <div className="card-actions justify-center mt-4">
                  <button
                    className="btn btn-primary mr-10"
                    onClick={() => {
                      handleRequests("rejected", request._id);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleRequests("accepted", request._id);
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Requests;
