import { Button } from "@/components/ui/button";
import { useStepConfig } from "@/hooks/useStepConfig";
import Image from "next/image";
import { useState } from "react";
import { linksSocialNetwork } from "@/data/linksSocialNetwork";

export function StepTwo() {
  const { setInfoUser, infoUser, nextStep } = useStepConfig();

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    infoUser?.platforms?.map((platform) => platform.name) || []
  );

  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatforms((prevSelected) => {
      if (prevSelected.includes(platform)) {
        return prevSelected.filter((item) => item !== platform);
      } else {
        return [...prevSelected, platform];
      }
    });
  };

  const handleContinue = () => {
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,

      platforms: linksSocialNetwork.filter(({ name }) =>
        selectedPlatforms.includes(name)
      ),
    }));

    nextStep();
  };

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">
        Which platforms are you on?
      </h2>
      <p className="text-center">Pickup the ones you are on.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 mt-4">
        {linksSocialNetwork.map(({ icon, name }) => (
          <div
            key={name}
            className={`flex flex-col gap-1 items-center rounded-lg py-3 hover:violet-300 transition-all duration-300 cursor-pointer *:
                   ${
                     selectedPlatforms.includes(name)
                       ? "bg-violet-900 text-white"
                       : "bg-slate-100 text-violet-900"
                   }
                `}
            onClick={() => handleSelectPlatform(name)}
          >
            <Image src={icon} alt="Icon" width={40} height={40} />
            <p className="text-sm">{name}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button className="w-full bg-purple-600" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
