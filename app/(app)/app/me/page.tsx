import { UserProfile } from "@clerk/nextjs";

import { requireUser } from "@/lib/auth";

export default async function MePage() {
  const user = await requireUser();

  // const { getToken } = auth();
  // const token = await getToken({
  //   template: "facebook",
  // });

  // const facebookAccount = user?.externalAccounts?.find(
  //   (account) => account.verification?.strategy === "oauth_facebook",
  // );
  // console.log({ token });
  return (
    <div>
      <UserProfile />
    </div>
  );
}
