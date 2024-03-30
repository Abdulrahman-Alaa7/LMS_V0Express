import React, { FC } from "react";
import "./loader.css";
type Props = {};

const Loader: FC<Props> = (props) => {
  return (
    <div className={`flex justify-center items-center h-screen`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
