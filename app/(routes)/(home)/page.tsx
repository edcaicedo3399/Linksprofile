"use client";
import {TreePalm} from "lucide-react";
import {HandlerSteps, LinkProfile} from "./components";
import {useUser} from "@clerk/nextjs";
import {useEffect, useState} from "react";

import {LoaderProfile} from "@/components/Shared";
import {StepConfigUserProvider, UserProvider} from "@/contexts";
import {ProfileInfo} from "./components/ProfileInfo";
import {ProfilePreview} from "./components/ProfilePreview";
import {ListSocialNetworks} from "./components/ListSocialNetworks";
import {User, Link} from ".prisma/client/default";

export default function HomePage() {
    const {user} = useUser();
    const [isFirstVisit, setIsFirstVisit] = useState(false);
    const [reload, setReload] = useState(false);
    const [infoUser, setInfoUser] = useState<(User & { links: Link[] }) | null>(
        null
    );

    useEffect(() => {
        const checkFirstLogin = async () => {
            const response = await fetch("/api/info-user");
            const data = await response.json();
            setInfoUser(data);
            setIsFirstVisit(data.firstLogin);
        };
        checkFirstLogin();

        if (reload) {
            checkFirstLogin();
            setReload(false);
        }
    }, [user?.id, reload, user]);

    if (!user || !infoUser) {
        return <LoaderProfile/>;
    }

    if (isFirstVisit) {
        return (
            <StepConfigUserProvider>
                <HandlerSteps onReload={setReload}/>
            </StepConfigUserProvider>
        );
    }

    return (
        <UserProvider>
            <div className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4 px-4">
                <div>
                    <LinkProfile/>

                    <ProfileInfo onReload={setReload}/>

                  {infoUser.links && infoUser.links.length > 0 ? (
                      <ListSocialNetworks links={infoUser.links} onReload={setReload} />
                  ) : (
                          <div className="mt-20 flex flex-col items-center">
                            <div
                                className="py-10 text-center justify-center flex flex-col
      items-center text-gray-400 font-semibold"
                            >
                              <TreePalm className="h-20 w-20" strokeWidth={1} />
                              <p>Show the world who you are.</p>
                              <p>Add a link to get started.</p>
                            </div>
                          </div>
                      )
                  }
                      </div>

                <ProfilePreview/>
            </div>
        </UserProvider>
    );
}
