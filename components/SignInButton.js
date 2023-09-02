'use client'

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <button
          className="bg-white p-2 px-4 rounded-lg"
          onClick={() => signIn()}
        >
          Login
        </button>
      </div>
    </div>
  );
}
