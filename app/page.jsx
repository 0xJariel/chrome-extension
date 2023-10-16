"use client";
import { useSession } from "next-auth/react";
import AuthUser from "./components/AuthUser";
import Playlists from "./components/Playlists";
import WebPlayback from "./components/SpotifyPlayback";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="grid mx-auto">
      <AuthUser />
      <Playlists />
      {!session?.user?.accessToken ? (
        "No Token"
      ) : (
        <WebPlayback token={session.user.accessToken} />
      )}
    </div>
  );
}
