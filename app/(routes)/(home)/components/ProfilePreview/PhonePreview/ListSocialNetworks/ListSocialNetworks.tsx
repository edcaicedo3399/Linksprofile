import { useUserInfo } from "@/hooks/useUser";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ListSocialNetworks() {
  const { links } = useUserInfo();

  if (!links) return null;

  return (
    <div className="flex flex-col gap-5 mt-10 w-full">
      {links.map((link) => (
        <div
          key={link.id}
          className="bg-cyan-900 text-white w-full px-4 
          py-2 items-center justify-center rounded-full shadow-md hover:bg-violet-200 hover:text-violet-800 
          transition-all duration-200"
        >
          <Link
            href={link.link || ""}
            target="_blank"
            className="flex justify-between items-center"
          >
            <Image
              src={link.icon || ""}
              alt="Icon"
              height={20}
              width={20}
              className="hover:scale-110 transition-all duration-200 filter grayscale"
            />
            <p className="font-medium">{link.name}</p>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}
