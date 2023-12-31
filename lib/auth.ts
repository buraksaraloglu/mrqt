import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

export async function requireUser() {
  const user = await currentUser();
  if (!user) {
    throw redirect("/sign-in");
  }

  return user;
}
