import React from "react";
import { useSelector } from "react-redux";
import User from "components/User";
import Error from "components/Error";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Error />;
  return (
    <div>
      <User />
    </div>
  );
};

export default Profile;
