"use client";
import { atom } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdState",
  default: null,
});

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

export const playlistTracksState = atom({
  key: "playlistTracksState",
  default: null,
});

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});

export const isPausedState = atom({
  key: "isPausedState",
  default: false,
});

export const isActiveState = atom({
  key: "isActiveState",
  default: false,
});

export const playerState = atom({
  key: "playerState",
  default: undefined,
});

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

export const currentTrackState = atom({
  key: "currentTrackState",
  default: track,
});

export const webDeviceIdState = atom({
  key: "webDeviceIdState",
  default: null,
});
