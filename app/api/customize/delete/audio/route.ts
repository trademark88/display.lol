import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
    try {
        // 1. Cookie und Token verarbeiten
        const cookieStore = cookies();
        const token = cookieStore.get("token");
        if (!token) {
            return NextResponse.json({ status: "fail", error: "No token provided" });
        }

        const userId = await decrypt<string>(token.value);
        if (!userId) {
            return NextResponse.json({ status: "fail", error: "Invalid token" });
        }

        // 2. Finde den Customize-Eintrag des Benutzers
        const customize = await prisma.customize.findFirst({
            where: {
                user: {
                    id: userId
                }
            }
        });

        if (!customize) {
            return NextResponse.json({ status: "fail", error: "Customize entry not found" });
        }

        const fileName = customize.audio;

        // 3. Datei löschen
        if (fileName) {
            await fs.unlink(`./public/uploads/audio/${fileName}`);
        }

        // 4. Datenbank aktualisieren
        await prisma.customize.update({
            where: {
                customize_id: customize.customize_id
            },
            data: {
                audio: null
            }
        });

        return NextResponse.json({ status: "success" });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e.message });
    }
}
