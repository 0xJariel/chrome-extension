"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SpotifySignInBtn = () => {
  return (
    <button
      onClick={() => {
        signIn("spotify");
      }}
      className="flex btn gap-8"
    >
      <Image
        src="/spotify-logo.png"
        alt="spotify logo"
        height={30}
        width={30}
      />
      <span className="">Sign in with Spotify</span>
    </button>
  );
};
export default SpotifySignInBtn;
