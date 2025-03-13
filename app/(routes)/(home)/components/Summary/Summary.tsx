import { useStepConfig } from "@/hooks/useStepConfig";
import { SummaryProps } from "./Summary.types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Confetti from "@/components/Shared/Confetti/Confetti";

export function Summary(props: SummaryProps) {
  const { onReload } = props;
  const { infoUser } = useStepConfig();
  const { avatarUrl, name, username, typeUser, platforms } = infoUser;

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">
        Your TarreTree is ready
      </h2>
      <p className="text-center">Its time to share to the world</p>

      <div className="relative">
        <div className="flex justify-center mt-4">
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full border-4 border-white shadow-xl aspect-square object-cover"
          />
        </div>
        <div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">@{username}</p>
            <p className="text-sm text-gray-400">Tye: {typeUser}</p>
          </div>
          <div className="space-y-3 mt-4">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center gap-2">
                <Image
                  src={platform.icon}
                  alt="Platform icon"
                  width={25}
                  height={25}
                />
                <p className="text-sm font-medium text-gray-700">
                  {platform.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Confetti />
        <div>
          <Button className="w-full bg-purple-600 mt-5" onClick={onReload}>
            Continue to the profile
          </Button>
        </div>
      </div>
    </div>
  );
}
