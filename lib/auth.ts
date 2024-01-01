import { redirect } from "next/navigation";
import { User } from "@clerk/backend";
import { clerkClient, currentUser } from "@clerk/nextjs";

import { prisma } from "./db";

export async function requireUser() {
  const user = await currentUser();

  if (!user) {
    throw redirect("/sign-in");
  }

  if (!user.privateMetadata?.localSyncedAt) {
    await initUser(user);
  }

  return user;
}

export async function initUser(user: User) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await prisma.user.create({
      data: {
        id: user.id,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        localSyncedAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    return;
  }
}

export const AUTH_ERRORS = {
  USER_NOT_FOUND: "User not found",
};
