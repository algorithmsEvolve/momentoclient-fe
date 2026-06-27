import BotanTheme from "@/components/features/invitations/themes/botan/BotanTheme";
import YuugureTheme from "@/components/features/invitations/themes/yuugure/YuugureTheme";
import AozoraTheme from "@/components/features/invitations/themes/aozora/AozoraTheme";
import YamatoTheme from "@/components/features/invitations/themes/yamato/YamatoTheme";
import YonakaTheme from "@/components/features/invitations/themes/yonaka/YonakaTheme";
import UnsupportedTheme from "@/components/features/invitations/UnsupportedTheme";

export const invitationThemeRegistry = {
  botan: BotanTheme,
  yuugure: YuugureTheme,
  aozora: AozoraTheme,
  yamato: YamatoTheme,
  yonaka: YonakaTheme,
};

export function resolveInvitationTheme(themeKey) {
  return invitationThemeRegistry[themeKey] || UnsupportedTheme;
}

