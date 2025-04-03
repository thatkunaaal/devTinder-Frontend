import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./features/connections/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionData = useSelector((state) => state.connection.value);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    //   console.log(res);
    } catch (err) {
    //   console.log(err.response.message); 
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connectionData)  return (
    <div className="text-xl text-center mt-20">
      No connections found, go to feed and make new connections.
    </div>
  );


  return (
    <div className="grid justify-items-center my-10">
      <div className="font-mono text-bold text-3xl ">
        your connections:{" "}
      </div>
      {connectionData && connectionData.map((connection) => (
        <div key={connection?._id}>
          <div className="card card-side bg-base-300 w-130 h-auto shadow-sm my-5">
            <figure >
            <div className="w-50"> 
              <img
                src={connection.photoUrl}
                className="w-full "
                style={{objectFit : "cover"}}
                alt="Movie"
              />
              </div>
            </figure>
            <div className="card-body w-80 h-auto">
              <h2 className="card-title">{connection.firstName + " " + connection.lastName}</h2>
              {connection.age && connection.gender && <p>{connection.age + ", " + connection.gender}</p>}
              <p >{connection.about}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
