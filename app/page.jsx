import AuthUser from "./components/AuthUser";
import Playlists from "./components/Playlists";


export default function Home() {
  return (
    <div className="grid mx-auto">
      <AuthUser />
      <Playlists />
    </div>
  );
}
