import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function FacultyProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  if (user) {
    const isFaculty = user?.role === "faculty";
    return isFaculty ? children : redirect("/");
  }
}
