import UnsupportedTheme from "@/components/features/invitations/UnsupportedTheme";
import { invitationThemeRegistry } from "@/components/features/invitations/theme-registry";

export default function InvitationPageShell({ invitation, guest }) {
  const themeKey = invitation?.theme?.componentKey || invitation?.theme?.slug;
  const ThemeComponent = invitationThemeRegistry[themeKey] || UnsupportedTheme;

  if (ThemeComponent === UnsupportedTheme) {
    return <UnsupportedTheme invitation={invitation} guest={guest} />;
  }

  return <ThemeComponent invitation={invitation} guest={guest} />;
}
