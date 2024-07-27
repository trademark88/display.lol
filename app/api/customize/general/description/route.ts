import { decrypt } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const cookiestore = cookies();
    const token = cookiestore.get("token");

    if (!token) {
        return NextResponse.json({ status: "fail", error: "No token provided" });
    }

    const userId = await decrypt<string>(token.value);
    if (!userId) {
        return NextResponse.json({ status: "fail", error: "Invalid token" });
    }

    const data = await req.json();
    const { description } = data;

    const customize = await prisma.customize.findFirst({
        where: {
            user: {
                id: userId,
            },
        },
    });

    if (!customize) {
        return NextResponse.json({ status: "fail", error: "Customize entry not found" });
    }

    await prisma.customize.update({
        where: {
            customize_id: customize.customize_id,
        },
        data: {
            description: description,
        },
    });

    return NextResponse.json({ status: "success", message: "Background effect updated successfully" });
}
