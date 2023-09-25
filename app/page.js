import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full text-blue-900 flex justify-between">
      <h2>
        Hello, <b>{session?.user.name}</b>
      </h2>

      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <Image
          src={session?.user?.image}
          width={30}
          height={30}
          alt={session?.user?.name}
        />
        <span className="py-1 px-2">{session?.user?.name}</span>
      </div>
    </div>
  );
}
