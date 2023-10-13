"use client";
import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";

const Playlists = () => {
  const [playlist, setPlaylist] = useState([]);
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (session) {
      console.log(session);
      //   spotifyApi.setAccessToken(session.user.accessToken);
      console.log("first");
    }
    if (spotifyApi.getAccessToken()) {
      console.log("passed");
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  console.log(playlist);

  return <div>{JSON.stringify(playlist)}hi</div>;
};

export default Playlists;
