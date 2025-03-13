import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useUserInfo } from "@/hooks/useUser";
import { Pencil } from "lucide-react";
import { SelectorProfileImage } from "./SelectorProfileImage";

export function ProfileImage() {
  const [showDialog, setShowDialog] = useState(false);

  const { user } = useUserInfo();

  if (!user) return null;

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger className="text-left">
        <div className="relative">
          <Image
            src={user.avatarUrl || "/default-avatar.jpeg"}
            alt="Avatar"
            width={64}
            height={64}
            className="rounded-full object-cover aspect-square"
          />

          <div
            className="bg-white rounded-full flex items-center 
          justify-center border w-xl h-xl absolute right-[-5px] bottom-[-15px] p-1.5"
          >
            <Pencil className="text-slate-300 w-4 h-4" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Display name and bio</DialogTitle>
          <DialogDescription asChild>
            <SelectorProfileImage setShowDialog={setShowDialog} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
