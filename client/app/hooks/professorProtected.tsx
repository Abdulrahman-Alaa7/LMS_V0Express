import React from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function ProfessorProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  if (user) {
    const isProfessor = user?.role === "professor";
    return isProfessor ? children : redirect("/");
  }
}
