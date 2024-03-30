"use client";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import ChangePasswordStudent from "../student/ChangePasswordStudent";
import ChangePassword from "../manger/ChangePassword";
import ChangePasswordUniversity from "../university/ChangePasswordUniversity";
import ChangePasswordFaculty from "../faculty/ChangePasswordFaculty";
import ChangePasswordDepartment from "../department/ChangePasswordDepartment";
import ChangePasswordProfessor from "../professor/ChangePasswordProfessor";

type Props = {};

const PrivateSettings: FC<Props> = ({}) => {
  const { user } = useSelector((state: any) => state.auth);
  const [changePassword, setChangePassword] = useState(false);
  return (
    <div className={`w-[90%] 800px:w-[70%] mx-auto mb-3 mt-12`}>
      <div
        className={`flex justify-between items-center bg-[#9e9e9e29] p-4 rounded-full mb-3`}
      >
        <h3 className="font-semibold mx-2">Password</h3>
        <button
          type="button"
          onClick={() => setChangePassword(!changePassword)}
          className="rounded-lg transition hover:opacity-80 bg-[#9e9e9e29] px-6 py-2 text-[#0095f6] mx-2"
        >
          {changePassword ? "Cancel" : "Change"}
        </button>
      </div>
      {changePassword && (
        <>
          {user?.role === "manger" && (
            <div>
              <ChangePassword user={user} />
            </div>
          )}
          {user?.role === "university" && (
            <div>
              <ChangePasswordUniversity user={user} />
            </div>
          )}
          {user?.role === "faculty" && (
            <div>
              <ChangePasswordFaculty user={user} />
            </div>
          )}
          {user?.role === "department" && (
            <div>
              <ChangePasswordDepartment user={user} />
            </div>
          )}
          {user?.role === "professor" && (
            <div>
              <ChangePasswordProfessor user={user} />
            </div>
          )}
          {user?.role === "student" && (
            <div>
              <ChangePasswordStudent user={user} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PrivateSettings;
