import { User } from "@prisma/client";
import { AvatarProps } from "@radix-ui/react-avatar";
import Avatar from "boring-avatars";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/shared/icons";

interface UserAvatarProps extends AvatarProps {
  userId?: string;
}

export function UserAvatar({ userId, ...props }: UserAvatarProps) {
  return (
    <Avatar
      size={40}
      name={userId || "Anonymous"}
      variant="marble"
      // colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
    />
  );
}
