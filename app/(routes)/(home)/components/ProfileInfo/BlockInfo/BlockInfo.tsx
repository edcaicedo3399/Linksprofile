import { useUserInfo } from "@/hooks/useUser";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormNameAndUsername } from "./FormNameAndUsername";

export function BlockInfo() {
  const { user } = useUserInfo();

  const [openDialog, setOpenDialog] = useState(false);

  if (!user) return null;

  return (
    <div className="w-full flex flex-col gap-1 px-2">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="text-left">
          <span className="hover:underline cursor-pointer">
            @{user.username}
          </span>
          <span className="block text-sm text-gray-400 hover:underline">
            {user?.bio ? "Edit bio" : "Add bio"}
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Display name, username and bio</DialogTitle>
            <DialogDescription asChild>
              <FormNameAndUsername setOpenDialog={setOpenDialog} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
