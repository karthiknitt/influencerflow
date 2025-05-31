import { auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const user = await currentUser();
  const userId = user?.id;

  if (userId) {
    redirect("/dashboard");
  }

  redirect("/sign-in");
}
