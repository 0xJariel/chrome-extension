"use client";
import { atom } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "37i9dQZF1DWSw8liJZcPOI",
});

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

export const playlistTracksState = atom({
  key: "playlistTracksState",
  default: null,
});