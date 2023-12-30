import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import Avatar from "boring-avatars";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/shared/icons";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name" | "email">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar
      size={40}
      name={user.name || user.email || "Anonymous"}
      variant="marble"
      // colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
    />
  );
}
