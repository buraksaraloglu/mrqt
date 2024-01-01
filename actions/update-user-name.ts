"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { userNameSchema } from "@/lib/validations/user";

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const user = await requireUser();

    const { name } = userNameSchema.parse(data);

    // Update the user name.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {},
    });

    revalidatePath("/app/settings");
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "error" };
  }
}
