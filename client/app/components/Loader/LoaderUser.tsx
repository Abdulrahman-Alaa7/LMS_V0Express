import React, { FC } from "react";
import "./LoaderUser.css";
type Props = {};

const LoaderUser: FC<Props> = (props) => {
  return (
    <div className={`flex justify-center items-center h-screen mx-2`}>
      <div className="loader-user"></div>
    </div>
  );
};

export default LoaderUser;
