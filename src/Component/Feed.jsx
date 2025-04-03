import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./features/feed/feedSlice";
import UserCards from "./UserCards";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feed.value);
  const getFeed = async () => {
    try {
      if (feedData) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(feedData.length <= 0)
    return (
      <div className="text-xl text-center mt-20">
      No new user found.
    </div>
    );

  return  feedData && ( <div >
    <UserCards user={feedData[0]}/>
  </div>)
};

export default Feed;
