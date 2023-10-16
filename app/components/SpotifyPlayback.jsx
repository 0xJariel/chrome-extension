"use client";
import React, { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  currentTrackState,
  playlistIdState,
  webDeviceIdState,
} from "../atoms/spotifyAtom";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();

  spotifyApi.setAccessToken(session.user.accessToken);

  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useRecoilState(currentTrackState);
  const [webDeviceId, setWebDeviceId] = useRecoilState(webDeviceIdState);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  // creates iframe  - in browser player
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = new window.Spotify.Player({
        name: "Pomodoro Web Player",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);
      console.log(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setWebDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        console.log(state.track_window.current_track);

        setTrack(state.track_window.current_track);
        state.paused;
        console.log(player);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : console.log(state);
          setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  useEffect(() => {
    // load first playlist
    // const load = async () => {};
    if (!playlistId || !webDeviceId) return;
    console.log(playlistId);
    spotifyApi.play({
      context_uri: `spotify:playlist:${playlistId}`,
      device_id: webDeviceId,
    });
    // must wait for song in order to pause it
    // spotifyApi.pause({ device_id: webDeviceId });
  }, [webDeviceId, playlistId]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
      setIsPlaying(false);
      return;
    }
    playTrack();
    setIsPlaying(true);
  };

  const playTrack = () => {
    if (!webDeviceId) return;
    // setIsPlaying(true);
    try {
      spotifyApi.play({
        device_id: webDeviceId,
      });
      console.log();
    } catch (error) {
      console.log("Error playing track", err);
    }
  };

  const pauseTrack = () => {
    if (!playlistId || !webDeviceId) return;
    try {
      spotifyApi.pause();
    } catch (error) {
      console.log("Error pausing track", err);
    }
  };

  const nextTrack = () => {
    try {
      spotifyApi.skipToNext();
    } catch (error) {
      console.log("Error pausing track", err);
    }
  };
  const previousTrack = () => {
    try {
      spotifyApi.skipToPrevious();
    } catch (error) {
      console.log("Error pausing track", err);
    }
  };

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              Instance not active. Transfer your playback using your Spotify app{" "}
              <button onClick={playTrack}>Play Me!</button>
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>

              <button className="btn-spotify" onClick={previousTrack}>
                &lt;&lt;
              </button>

              <button className="btn-spotify" onClick={togglePlay}>
                {!isPlaying ? "PLAY" : "PAUSE"}
              </button>

              <button className="btn-spotify" onClick={nextTrack}>
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WebPlayback;
