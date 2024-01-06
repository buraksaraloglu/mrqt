import { redirect } from "next/navigation";
import { User } from "@clerk/backend";
import { clerkClient, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { format, isAfter, isBefore, parseISO } from "date-fns";

import { prisma } from "./db";

export async function requireUser({
  returnBackUrl = "/",
}:
  | {
      returnBackUrl?: string;
    }
  | undefined = {}) {
  const user = await currentUser();

  if (!user) {
    throw redirectToSignIn({ returnBackUrl });
  }

  if (
    !user.privateMetadata?.localSyncedAt ||
    isBefore(
      parseISO(user.privateMetadata.localSyncedAt as string),
      new Date().setDate(new Date().getDate() - 1),
    )
  ) {
    console.log("syncing user");
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
