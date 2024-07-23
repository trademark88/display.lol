export interface User {
  id: string;
  uid: number;
  profile_views: number;
  email: string;
  username: string;
  alias?: string;
  password: string;
  createdAt: Date;
  customization: Customize[];
  color_customization: Color_Customization[];
  other_customization: Other_Customization[];
  profiles: Profiles[];
}

export interface Customize {
  customize_id: string;
  user: User;
  background: string;
  custom_cursor: string;
  profile_avatar: string;
  audio: string;
  description: string;
  background_effects: BackgroundEffects;
  username_effects: UsernameEffects;
  profile_opacity: number;
  profile_blur: number;
  swap_box_colors: boolean;
  social_glow: boolean;
  username_glow: boolean;
  badge_glow: boolean;
}

export interface Color_Customization {
  color_customization_id: string;
  user: User;
  accent_color: string;
  background_color: string;
  text_color: string;
  icon_color: string;
}

export interface Other_Customization {
  other_customization_id: string;
  user: User;
  monochrome_icons: boolean;
  animated_title: boolean;
  volume_control: boolean;
  use_discord_avatar: boolean;
}

export interface Profiles {
  profiles_id: string;
  user: User;
  snapchat: string;
  youtube: string;
  discord: string;
  spotify: string;
  instagram: string;
  x: string;
  tiktok: string;
  telegram: string;
  soundcloud: string;
  paypal: string;
  github: string;
  roblox: string;
  cash_app: string;
  gitlab: string;
  twitch: string;
  reddit: string;
  namemc: string;
  onlyfans: string;
  linkedin: string;
  steam: string;
  kick: string;
  pinterest: string;
  lastfm: string;
  buymeacoffee: string;
  kofi: string;
  facebook: string;
  bitcoin: string;
  ethereum: string;
  litecoin: string;
  monero: string;
  email: string;
  custom_social: Custom_Url[];
}

export interface Custom_Url {
  custom_url_id: string;
  social_icon: string;
  website: string;
  profile: Profiles;
}

export enum BackgroundEffects {
  None = "none",
  Snowflakes = "snowflakes",
  Rain = "rain",
  BlurredBackground = "blurred_background",
  NightTime = "night_time",
  OldTv = "old_tv"
}

export enum UsernameEffects {
  RainbowName = "rainbow_name",
  BlackSparkles = "black_sparkles",
  BlueSparkles = "blue_sparkles",
  GreenSparkles = "green_sparkles",
  PinkSparkles = "pink_sparkles",
  RedSparkles = "red_sparkles",
  WhiteSparkles = "white_sparkles",
  YellowSparkles = "yellow_sparkles"
}
