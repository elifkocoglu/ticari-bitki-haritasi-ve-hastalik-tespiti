"use client";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function GoogleKickoff() {
  useEffect(() => {
    signIn("google");
  }, []);
  return <div className="max-w-md mx-auto px-4 py-10">Google ile devam ediliyor...</div>;
}






