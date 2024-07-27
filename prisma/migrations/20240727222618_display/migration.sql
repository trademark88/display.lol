-- CreateEnum
CREATE TYPE "background_effects" AS ENUM ('none', 'backgroundbeams', 'snowfall', 'matrix');

-- CreateEnum
CREATE TYPE "username_effects" AS ENUM ('none', 'glowing', 'typing', 'shaking', 'color_changing', 'font_changing');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "uid" SERIAL NOT NULL,
    "profile_views" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "alias" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customize" (
    "customize_id" TEXT NOT NULL,
    "background" TEXT,
    "custom_cursor" TEXT,
    "profile_avatar" TEXT,
    "audio" TEXT,
    "description" TEXT,
    "background_effects" "background_effects",
    "username_effects" "username_effects",
    "profile_opacity" INTEGER NOT NULL,
    "profile_blur" INTEGER NOT NULL,
    "swap_box_colors" BOOLEAN NOT NULL DEFAULT false,
    "social_glow" BOOLEAN NOT NULL DEFAULT true,
    "username_glow" BOOLEAN NOT NULL DEFAULT true,
    "badge_glow" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Customize_pkey" PRIMARY KEY ("customize_id")
);

-- CreateTable
CREATE TABLE "Color_Customization" (
    "color_customization_id" TEXT NOT NULL,
    "accent_color" TEXT NOT NULL DEFAULT '1b1b1b',
    "background_color" TEXT NOT NULL DEFAULT '080808',
    "text_color" TEXT NOT NULL DEFAULT 'FFFFFF',
    "icon_color" TEXT NOT NULL DEFAULT 'FFFFFF',

    CONSTRAINT "Color_Customization_pkey" PRIMARY KEY ("color_customization_id")
);

-- CreateTable
CREATE TABLE "Other_Customization" (
    "other_customization_id" TEXT NOT NULL,
    "monochrome_icons" BOOLEAN NOT NULL DEFAULT true,
    "animated_title" BOOLEAN NOT NULL DEFAULT false,
    "volume_control" BOOLEAN NOT NULL DEFAULT false,
    "use_discord_avatar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Other_Customization_pkey" PRIMARY KEY ("other_customization_id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "profiles_id" TEXT NOT NULL,
    "snapchat" TEXT,
    "youtube" TEXT,
    "discord" TEXT,
    "spotify" TEXT,
    "instagram" TEXT,
    "x" TEXT,
    "tiktok" TEXT,
    "telegram" TEXT,
    "soundcloud" TEXT,
    "paypal" TEXT,
    "github" TEXT,
    "roblox" TEXT,
    "cash_app" TEXT,
    "gitlab" TEXT,
    "twitch" TEXT,
    "reddit" TEXT,
    "namemc" TEXT,
    "onlyfans" TEXT,
    "linkedin" TEXT,
    "steam" TEXT,
    "kick" TEXT,
    "pinterest" TEXT,
    "lastfm" TEXT,
    "buymeacoffee" TEXT,
    "kofi" TEXT,
    "facebook" TEXT,
    "bitcoin" TEXT,
    "ethereum" TEXT,
    "litecoin" TEXT,
    "monero" TEXT,
    "email" TEXT,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profiles_id")
);

-- CreateTable
CREATE TABLE "Custom_Url" (
    "custom_url_id" TEXT NOT NULL,
    "social_icon" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "Custom_Url_pkey" PRIMARY KEY ("custom_url_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Customize" ADD CONSTRAINT "Customize_customize_id_fkey" FOREIGN KEY ("customize_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color_Customization" ADD CONSTRAINT "Color_Customization_color_customization_id_fkey" FOREIGN KEY ("color_customization_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Other_Customization" ADD CONSTRAINT "Other_Customization_other_customization_id_fkey" FOREIGN KEY ("other_customization_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_profiles_id_fkey" FOREIGN KEY ("profiles_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Custom_Url" ADD CONSTRAINT "Custom_Url_custom_url_id_fkey" FOREIGN KEY ("custom_url_id") REFERENCES "Profiles"("profiles_id") ON DELETE RESTRICT ON UPDATE CASCADE;
