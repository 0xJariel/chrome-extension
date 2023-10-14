"use client";
import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

const Playlists = () => {
  const [playlist, setPlaylist] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

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

  return (
    <div>
      <label htmlFor="cars">Choose a playlist:</label>

      <select
        name="cars"
        id="cars"
        style={{ maxWidth: 150 }}
        onChange={(e) => {
          setPlaylistId(e.target.value);
          console.log(playlistId);
        }}
      >
        {playlist.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </select>
    </div>
  );
};

export default Playlists;
