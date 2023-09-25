'use client'

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <button
          className="text-gray-500 bg-white text-2xl p-2 px-4 rounded-lg hover:shadow-md hover:text-primary"
          onClick={() => signIn()}
        >
          Login
        </button>
      </div>
    </div>
  );
}
