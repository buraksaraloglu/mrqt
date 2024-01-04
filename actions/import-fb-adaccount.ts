"use server";

import { revalidatePath } from "next/cache";
import { getFacebookToken } from "@/services/facebook";
import { fetchUserFacebookAdAccounts } from "@/services/facebook/service/ad-account";
import { AdAccount } from "@/services/facebook/types";

import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

type UpdateAdAccountData = Pick<AdAccount, "id" | "accountId"> & {
  isActive?: boolean;
};

export async function upsertAdAccount(data: UpdateAdAccountData) {
  const user = await requireUser();
  const facebookAdAccounts = await fetchUserFacebookAdAccounts(user.id);
  if (!facebookAdAccounts || facebookAdAccounts.length === 0) {
    return { status: "error", data: null };
  }
  const adAccount = facebookAdAccounts.find(
    (adAccount) => adAccount.id === data.id,
  );
  if (!adAccount) {
    return { status: "error", data: null };
  }

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
        name: adAccount.name,
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
