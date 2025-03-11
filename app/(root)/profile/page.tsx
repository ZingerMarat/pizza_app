import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "@/shared/lib/get-user-session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await getUserSession();

    if (!session) {
        return redirect('/not-auth')
    }

    const user = await prisma.user.findFirst({where: {id: Number(session?.id)}});

    return <ProfileForm data={user}>
}