import { ChevronLeft } from "lucide-react";
import { TabDeleteImageProps } from "./TabDeleteImage.types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useUserInfo } from "@/hooks/useUser";

export function TabDeleteImage(props: TabDeleteImageProps) {
  const { setShowDialog, setShowTab } = props;

  const { reloadUser } = useUserInfo();

  const onRemoveImage = async () => {
    await axios.patch("/api/update-user", {
      avatarUrl:
        "https://utfs.io/f/jQ6VjZgohTw7i5oOIkGUge59DNyndI0jYAoJszphmEkSuRqb",
    });
    setShowDialog(false);
    toast({
      title: "Profile image deleted",
    });

    reloadUser();
  };
  return (
    <div>
      <div
        className="flex gap-1 items-center text-sm cursor-pointer 
    hover:bg-slate-100 p-1 w-fit rounded-lg"
        onClick={() => setShowTab(null)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <Button
          className="bg-violet-600 text-white rounded-full"
          onClick={onRemoveImage}
        >
          Yes, remove
        </Button>

        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => setShowTab(null)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
