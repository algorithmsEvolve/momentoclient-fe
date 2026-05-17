import BotanTheme from "@/components/features/invitations/themes/botan/BotanTheme";
import UnsupportedTheme from "@/components/features/invitations/UnsupportedTheme";

export const invitationThemeRegistry = {
  botan: BotanTheme,
};

export function resolveInvitationTheme(themeKey) {
  return invitationThemeRegistry[themeKey] || UnsupportedTheme;
}
