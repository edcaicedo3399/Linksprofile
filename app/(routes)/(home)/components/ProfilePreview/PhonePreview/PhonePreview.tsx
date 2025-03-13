import { useUserInfo } from "@/hooks/useUser";
import { Palmtree } from "lucide-react";
import Image from "next/image";
import { ListSocialNetworks } from "./ListSocialNetworks";

export function PhonePreview() {
  const { user } = useUserInfo();

  return (
    <div className="my-5">
      <div
        className="relative mx-auto border-white border-[5px] rounded-[2.5rem] 
        h-[600px] w-[300px] shadow-xl"
      >
        <div className="relative rounded-[2rem] overflow-hidden w-[290px] h-[590px]">
          {user?.backgroundImage ? (
            <Image
              src={user.backgroundImage}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="absolute top-0 left-0 w-full h-full"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-[#E4E9ED]" />
          )}

          <div
            className="relative z-10 flex flex-col items-center 
          p-6 justify-between h-full"
          >
            <Image
              src={user?.avatarUrl || "/default-avatar.jpeg"}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full object-cover aspect-square"
            />

            <p className="font-semibold text-sm mt-2 text-cyan-900">
              @{user?.username}
            </p>
            {user?.bio && (
              <div className="my-2">
                <p className="text-center">{user.bio}</p>
              </div>
            )}

            <div className="min-h-[70%] w-full">
              <ListSocialNetworks />
            </div>
            <div>
              <p className="flex gap-1 items-center font-semibold">
                TarreTreeClone <Palmtree className="h-4 w-4" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
