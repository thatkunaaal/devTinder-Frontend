import React from "react";

const UserCards = ({ user }) => {
  const { firstName, lastName, age, gender, about, skills } = user;
  return (
    <div className="flex justify-center ">
      <div className="card bg-base-300 flex w-96 my-17 shadow-sm">
        <figure className="h-120">
          <img
            src = {user.photoUrl}
            style={{objectFit: "cover" ,height: "100vh" ,width : "100%"}}
            alt="Profile"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && (
            <p>
              {`${age}, ${gender}`}
            </p>
          )}
          
          <p >{about}</p>
          {skills && skills.length > 0 && <p>Skills: {...skills}</p>}
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary mr-10">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
