import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

const useSpotify = () => {
  const { data: session, status } = useSession();

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  useEffect(() => {
    const updateSpotifyAccessToken = async () => {
      try {
        if (session) {
          if (session.error === "RefreshAccessTokenError") {
            console.log(session.error);
            await signIn("spotify");
          }
          spotifyApi.setAccessToken(session.user.accessToken);
          console.log("access token added");
        }
        console.log("new session");
      } catch (error) {
        // Handle errors here
        console.error("Error updating Spotify access token:", error);
      }
    };

    updateSpotifyAccessToken();
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
