"use client";
import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { styles } from "../../styles/style";

type Props = {};

const Reviews: FC<Props> = () => {
  return (
    <div className={`w-[90%] 800px:w-[85%] m-auto`}>
      <div className={`w-full 800px:flex items-center`}>
        <div className={`800px:w-[50%] w-full`}>
          <Image
            src={require("../../../public/assets/business-img.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className={`800px:w-[50%] w-full`}>
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are{" "}
            <span className={`${styles.textGradient}`}>Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={`${styles.label}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            possimus. Nostrum cumque mollitia non commodi assumenda nemo ipsum
            ipsa aperiam, doloremque numquam saepe in enim obcaecati earum nam
            id incidunt.
          </p>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Reviews;
