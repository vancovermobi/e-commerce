'use client'

import { signOut, useSession } from "next-auth/react";

export default function SignOutButton() {
  return (
    <div className="">
    <div className="">
      <button
        className="p2 px-4 rounded-lg"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  </div>
  )
}
