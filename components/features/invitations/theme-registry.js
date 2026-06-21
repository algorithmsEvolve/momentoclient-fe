import BotanTheme from "@/components/features/invitations/themes/botan/BotanTheme";
import YuugureTheme from "@/components/features/invitations/themes/yuugure/YuugureTheme";
import UnsupportedTheme from "@/components/features/invitations/UnsupportedTheme";

export const invitationThemeRegistry = {
  botan: BotanTheme,
  yuugure: YuugureTheme,
};

export function resolveInvitationTheme(themeKey) {
  return invitationThemeRegistry[themeKey] || UnsupportedTheme;
}
