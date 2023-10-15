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
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        console.log(session.error);
        signIn("spotify");
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
    console.log("new session");
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
