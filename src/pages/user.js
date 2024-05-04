import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { findUser } from "../features/userSlice";
import Profile from "../components/Profile";

function User() {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const userId = params.userId;
    const res = dispatch(findUser(userId));
    console.log(res);
  }, []);

  return (
    <div>
      <Profile />
    </div>
  );
}

export default User;
