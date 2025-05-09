import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <EditProfile user={user} profile={true} />
    </div>
  );
};

export default Profile;
