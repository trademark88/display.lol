import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";
import { v4 as uuidv4 } from 'uuid';
import { cookies } from "next/headers";
import { decrypt } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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

        // 2. Formulardaten verarbeiten
        const formData = await req.formData();
        const file = formData.get("avatar") as File;

        if (!file) {
            return NextResponse.json({ status: "fail", error: "No file provided" });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        // Generiere einen UUID-basierten Dateinamen
        const fileExtension = file.name.split('.').pop(); // Dateiendung extrahieren
        const uuidFileName = `${uuidv4()}.${fileExtension}`;

        // Datei speichern
        await fs.writeFile(`./public/uploads/avatar/${uuidFileName}`, buffer);

        // 3. Finde den Customize-Eintrag des Benutzers
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

        // 4. Datenbank aktualisieren
        await prisma.customize.update({
            where: {
                customize_id: customize.customize_id
            },
            data: {
                profile_avatar: uuidFileName
            }
        });

        // Neuladen der Seite (oder andere erforderliche Aktionen)
        revalidatePath("/");

        return NextResponse.json({ status: "success", fileName: uuidFileName });
    } catch (e: any) {
        console.error(e);
        return NextResponse.json({ status: "fail", error: e.message });
    }
}
