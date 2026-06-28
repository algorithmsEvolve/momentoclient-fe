import BotanTheme from "@/components/features/invitations/themes/botan/BotanTheme";
import YuugureTheme from "@/components/features/invitations/themes/yuugure/YuugureTheme";
import AozoraTheme from "@/components/features/invitations/themes/aozora/AozoraTheme";
import YamatoTheme from "@/components/features/invitations/themes/yamato/YamatoTheme";
import YonakaTheme from "@/components/features/invitations/themes/yonaka/YonakaTheme";
import BaraTheme from "@/components/features/invitations/themes/bara/BaraTheme";
import BaraSimpleTheme from "@/components/features/invitations/themes/bara-simple/BaraSimpleTheme";
import UnsupportedTheme from "@/components/features/invitations/UnsupportedTheme";

export const invitationThemeRegistry = {
  botan: BotanTheme,
  yuugure: YuugureTheme,
  aozora: AozoraTheme,
  yamato: YamatoTheme,
  yonaka: YonakaTheme,
  bara: BaraTheme,
  "bara-simple": BaraSimpleTheme,
};

export function resolveInvitationTheme(themeKey) {
  return invitationThemeRegistry[themeKey] || UnsupportedTheme;
}

