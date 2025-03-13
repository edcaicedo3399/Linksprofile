import { Link, User } from "@prisma/client";

export type UserProfileProps = {
  user: User & { links: Link[] };
};
