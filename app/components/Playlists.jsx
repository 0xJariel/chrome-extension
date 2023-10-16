"use client";
import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  playlistState,
  playlistIdState,
  playlistTracksState,
} from "../atoms/spotifyAtom";

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
        setPlaylistId(data.body.items[0].id);
      });
    }
  }, [session]);

  useEffect(() => {
    if (!playlistId) return;
    const getTracks = async (playlistId) => {
      if (await spotifyApi.getAccessToken()) {
        const tracks = await spotifyApi.getPlaylistTracks(playlistId);
        console.log("tracks:", tracks.body.items);
        await setPlaylistTracks(tracks.body.items);
      }
    };

    getTracks(playlistId);
  }, [playlistId]);

  return (
    <div>
      <label htmlFor="playlist">Choose a playlist:</label>

      <select
        name="playlist"
        id="playlist"
        style={{ maxWidth: 150 }}
        onChange={(e) => {
          setPlaylistId(e.target.value);
          console.log(
            "playlist changed to:",
            e.target.selectedOptions[0].getAttribute("name"),
            "id:",
            e.target.value
          );
        }}
      >
        {playlist?.map((item, i) => {
          return (
            <option value={item.id} key={item.id} name={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
      {/* {playlistTracks?.map((item) => {
        <div>{item}</div>;
      })} */}
    </div>
  );
};

export default Playlists;
