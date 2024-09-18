"use client";

import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return <button onClick={() => signOut()}>登出</button>;
};

export default SignOutButton;
