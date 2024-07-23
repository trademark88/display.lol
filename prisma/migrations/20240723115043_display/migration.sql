-- CreateEnum
CREATE TYPE "background_effects" AS ENUM ('none', 'snowflakes', 'rain', 'blurred_background', 'night_time', 'old_tv');

-- CreateEnum
CREATE TYPE "username_effects" AS ENUM ('rainbow_name', 'black_sparkles', 'blue_sparkles', 'green_sparkles', 'pink_sparkles', 'red_sparkles', 'white_sparkles', 'yellow_sparkles');

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
    "background" TEXT NOT NULL,
    "custom_cursor" TEXT NOT NULL,
    "profile_avatar" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "background_effects" "background_effects" NOT NULL,
    "username_effects" "username_effects" NOT NULL,
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
    "snapchat" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "spotify" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "x" TEXT NOT NULL,
    "tiktok" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "soundcloud" TEXT NOT NULL,
    "paypal" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "roblox" TEXT NOT NULL,
    "cash_app" TEXT NOT NULL,
    "gitlab" TEXT NOT NULL,
    "twitch" TEXT NOT NULL,
    "reddit" TEXT NOT NULL,
    "namemc" TEXT NOT NULL,
    "onlyfans" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "steam" TEXT NOT NULL,
    "kick" TEXT NOT NULL,
    "pinterest" TEXT NOT NULL,
    "lastfm" TEXT NOT NULL,
    "buymeacoffee" TEXT NOT NULL,
    "kofi" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "bitcoin" TEXT NOT NULL,
    "ethereum" TEXT NOT NULL,
    "litecoin" TEXT NOT NULL,
    "monero" TEXT NOT NULL,
    "email" TEXT NOT NULL,

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
