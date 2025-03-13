"use client";

import { LoaderProfile } from "@/components/Shared";
import { Link, User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NotFoundUser, UserProfile } from "./components";

export default function UserPage() {
  const params = useParams();
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [infoUser, setInfoUser] = useState<(User & { links: Link[] }) | null>(
    null
  );

  const router = useRouter();
  const username = params?.user;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!username) {
        router.push("/");
      }

      setIsLoading(true);

      try {
        const response = await fetch(`/api/info-user/${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setInfoUser(data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();

    if (reload) {
      fetchUserProfile();
      setReload(false);
    }
  }, [username, reload, router]);

  if (isLoading) {
    return <LoaderProfile />;
  }

  if (!infoUser) {
    return <NotFoundUser />;
  }

  return <UserProfile user={infoUser} />;
}
