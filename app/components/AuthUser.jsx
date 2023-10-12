"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const AuthUser = () => {
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <div>
          Name: <span>{session?.user?.name}</span>
          {/* <span>{JSON.stringify(session.user.image)}</span> */}
        </div>
        <div>
          Email: <span>{session?.user?.email}</span>
        </div>
      </div>
    );
  }
};

export default AuthUser;
