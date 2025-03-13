import Image from "next/image";
import { SocialLinksProps } from "./SocialLinks.types";
import { dataLinks } from "./SocialLinks.data";

export function SocialLinks(props: SocialLinksProps) {
  const { userName } = props;

  const copyToClipboard = () => {
    const url = `${window.location.origin}/${userName}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });
  };
  return (
    <div className="overflow-auto">
      <div className="flex gap-6 py-4">
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={copyToClipboard}
        >
          <Image
            src="/social-networks/link.webp"
            alt="Icon"
            width={40}
            height={40}
            className="hover:scale-110 transition-all duration-200"
          />
          <span className="text-xs font-semibold">Copy</span>
        </div>

        {dataLinks.map((link) => (
          <a
            href={`${link.link}/${userName}`}
            target="_blank"
            rel="noreferrer"
            key={link.id}
            className="flex flex-col items-center gap-2"
          >
            <Image
              src={link.icon}
              alt="Icon"
              width={40}
              height={40}
              className="hover:scale-110 transition-all duration-200"
            />
            <span className="text-xs font-semibold">{link.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
