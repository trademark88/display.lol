import { decrypt } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Instantiate Prisma Client
const prisma = new PrismaClient();

// POST handler for removing a link
export async function POST(req: Request) {
  try {
    // Accessing the cookies
    const cookiestore = cookies();
    const token = cookiestore.get("token");

    // Check if token is provided
    if (!token) {
      return NextResponse.json(
        { status: "fail", error: "No token provided" },
        { status: 401 }
      );
    }

    // Decrypt token to get userId
    const userId = await decrypt<string>(token.value);

    // Validate decrypted userId
    if (!userId) {
      return NextResponse.json(
        { status: "fail", error: "Invalid token" },
        { status: 403 }
      );
    }

    // Parse incoming request JSON
    const data = await req.json();
    const { brand } = data;

    // Validate the request data
    if (!brand) {
      return NextResponse.json(
        { status: "fail", error: "Brand field missing" },
        { status: 400 }
      );
    }

    // Debugging logs
    console.log("Received data:", data);

    // Retrieve profiles for the given userId
    const profiles = await prisma.profiles.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
    });

    // Check if profiles exist for the user
    if (!profiles) {
      return NextResponse.json(
        { status: "fail", error: "Profile entry not found" },
        { status: 404 }
      );
    }

    // Validate if the brand is one of the allowed fields in the Profiles model
    const allowedFields = [
      "snapchat", "youtube", "discord", "spotify", "instagram", "x",
      "tiktok", "telegram", "soundcloud", "paypal", "github", "roblox",
      "cash_app", "gitlab", "twitch", "reddit", "namemc", "onlyfans", "linkedin",
      "steam", "kick", "pinterest", "lastfm", "buymeacoffee", "kofi",
      "facebook", "bitcoin", "ethereum", "litecoin", "monero", "email", "website"
    ];

    if (!allowedFields.includes(brand.toLowerCase())) {
      return NextResponse.json(
        { status: "fail", error: "Invalid brand field" },
        { status: 400 }
      );
    }

    // Remove the link from the profiles
    const updatedProfile = await prisma.profiles.update({
      where: {
        profiles_id: profiles.profiles_id,
      },
      data: {
        [brand.toLowerCase()]: null, // Set the field to null
      },
    });

    console.log("Updated Profile:", updatedProfile);

    // Return success response
    return NextResponse.json({
      status: "success",
      message: "Profile link removed successfully",
      updatedProfile,  // Send back the updated profile for confirmation
    });
  } catch (error) {
    console.error("Error removing profile link:");
    return NextResponse.json(
      { status: "error", error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
