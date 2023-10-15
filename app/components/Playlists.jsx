"use client";
import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  playlistState,
  playlistIdState,
  playlistTracksState,
} from "../atoms/playlistAtom";

const Playlists = () => {
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlistTracks, setPlaylistTracks] =
    useRecoilState(playlistTracksState);

  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  //   I dont understand why the access token isnt being removed after the initial render
  // also not being added again in useSpotify
  if (session) spotifyApi.setAccessToken(session.user.accessToken);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items);
        console.log("loaded playlists: ", data.body.items);
      });
    }
  }, [session]);

  useEffect(() => {
    const getTracks = async (playlistId) => {
      console.log(await spotifyApi.getAccessToken());
      if (await spotifyApi.getAccessToken()) {
        const tracks = await spotifyApi.getPlaylistTracks(playlistId);
        console.log("tracks:", tracks.body.items);
        await setPlaylistTracks(tracks.body.items);
      }
    };

    getTracks(playlistId);
  }, [session, playlistId]);

  return (
    <div>
      <label htmlFor="cars">Choose a playlist:</label>

      <select
        name="cars"
        id="cars"
        style={{ maxWidth: 150 }}
        onChange={(e) => {
          setPlaylistId(e.target.value);
          console.log("current ID:", playlistId);
          console.log("current playlist ID:", e.target.value);
        }}
      >
        {playlist?.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          setPlaylistId("37i9dQZF1EIXwkdkoDV3G5");
          console.log(playlistId);
        }}
      >
        Click
      </button>
      {/* {playlistTracks?.map((item) => {
        <div>{item}</div>;
      })} */}
    </div>
  );
};

export default Playlists;
