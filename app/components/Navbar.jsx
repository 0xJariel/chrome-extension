"use client";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import SpotifySignInBtn from "./SpotifySignInBtn";

const Navbar = () => {
  const { status } = useSession();
  return (
    <nav className="flex p-4 justify-between">
      <Link href={"/"} className="font-bold text-lg text-blue-700">
        Logo
      </Link>
      {status === "authenticated" ? (
        <button
          onClick={() => {
            signOut();
          }}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sign Out
        </button>
      ) : (
        <SpotifySignInBtn
          onClick={() => {
            signIn("spotify");
          }}
          className={"bg-slate-900 text-white px-6 py-2 rounded-md"}
        />
      )}
    </nav>
  );
};

export default Navbar;
