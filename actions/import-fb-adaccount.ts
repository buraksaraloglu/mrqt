"use server";

import { revalidatePath } from "next/cache";
import { AdAccount } from "@/services/facebook/interfaces";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

type UpdateAdAccountData = AdAccount & {
  isActive?: boolean;
};

export async function upsertAdAccount(data: UpdateAdAccountData) {
  const user = await requireUser();

  try {
    const updatedAdAccount = await prisma.facebookAdAccount.upsert({
      where: {
        id: data.id,
        userId: user.id,
      },
      update: {
        isActive: data.isActive,
      },
      create: {
        id: data.id,
        name: data.name,
        accountId: data.accountId,
        isActive: data.isActive || false,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return { status: "success", data: { adAccount: updatedAdAccount } };
  } catch (error) {
    return { status: "error", data: null };
  }
}
