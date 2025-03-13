import Image from "next/image";
import { dataStepFourImages } from "./StepFour.data";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { Plus } from "lucide-react";
import { useStepConfig } from "@/hooks/useStepConfig";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export function StepFour() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const { setInfoUser, infoUser, nextStep } = useStepConfig();

  const handleImageSelect = (src: string) => {
    setSelectedPhoto(src);
    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      avatarUrl: src,
    }));
  };

  const handleContinue = async () => {
    if (!name || !username) {
      alert("Please, fill all fields and select and image");
      return;
    }

    setInfoUser((prevInfoUser) => ({
      ...prevInfoUser,
      name,
      username,
    }));

    try {
      const response = await axios.post("/api/user", {
        name: name,
        username: username,
        avatarUrl: infoUser.avatarUrl,
        links: infoUser.platforms,
        typeUser: infoUser.typeUser,
      });

      if (response.status === 200) {
        nextStep();
      }
    } catch (error) {
      toast({ title: "Este usuario ya existe. Inténtalo de nuevo con otro" });
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-center font-semibold text-2xl">
        Add profile details
      </h2>
      <p className="text-center">Select your profile image or upload it.</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-4 items-center">
        {dataStepFourImages.map(({ src }) => (
          <div
            key={src}
            className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer
                ${
                  selectedPhoto === src
                    ? "bg-violet-500"
                    : "hover:bg-violet-300"
                }
                `}
            onClick={() => handleImageSelect(src)}
          >
            <Image
              src={src}
              alt="profile"
              className="h-30 w-30 rounded-full"
              width={300}
              height={300}
            />
          </div>
        ))}
        {photoUrl && (
          <div
            className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer
            ${
              selectedPhoto === photoUrl
                ? "bg-violet-500"
                : "hover:bg-violet-300"
            } 
            `}
            onClick={() => handleImageSelect(photoUrl)}
          >
            <Image
              src={photoUrl}
              alt="profile"
              className="h-30 w-30 rounded-full object-cover aspect-square"
              width={300}
              height={300}
            />
          </div>
        )}
        {showUploadPhoto ? (
          <UploadButton
            className="rounded-md text-slate-800 bg-slate-200 h-full"
            endpoint="profileImage"
            onClientUploadComplete={(res) => {
              setPhotoUrl(res?.[0].url);
              setShowUploadPhoto(false);
            }}
            onUploadError={(error: Error) => {
              console.log(error);
            }}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center hover:bg-slate-100 h-full rounded-full cursor-pointer border"
            onClick={() => setShowUploadPhoto(!showUploadPhoto)}
          >
            <Plus className="w-7 h-7" />
          </div>
        )}
      </div>

      <div className="mt-5">
        <h3 className="text-lg my-3 text-center">Add your username</h3>
        <div className="grid gap-4">
          <Input
            placeholder="Name"
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Username"
            className="w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mt-6 md:mt-16">
          <Button className="w-full bg-purple-600" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
