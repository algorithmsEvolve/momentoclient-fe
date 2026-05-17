import { notFound } from "next/navigation";
import InvitationPageShell from "@/components/features/invitations/InvitationPageShell";
import {
  getInvitationBySlug,
  getInvitationGuest,
} from "@/lib/api/invitations";
import { normalizeInvitationResponse } from "@/lib/invitations/normalizeInvitation";
import { isReservedInvitationSlug } from "@/lib/invitations/routes";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  if (isReservedInvitationSlug(slug)) {
    return {
      title: "Momento",
      description: "Momento digital invitation.",
    };
  }

  const result = await getInvitationBySlug(slug);

  if (!result.ok || !result.data) {
    return {
      title: "Undangan tidak ditemukan | Momento",
      description: "Undangan digital tidak ditemukan.",
    };
  }

  const invitation = normalizeInvitationResponse(result.data);

  return {
    title: `${invitation.title} | Momento`,
    description: "Yuk cek undanganmu sekarang!",
    openGraph: {
      title: invitation.title,
      description: "Yuk cek undanganmu sekarang!",
      images: invitation.ogImageUrl ? [invitation.ogImageUrl] : [],
    },
  };
}

export default async function InvitationPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  if (isReservedInvitationSlug(slug)) {
    notFound();
  }

  const invitationResult = await getInvitationBySlug(slug);

  if (!invitationResult.ok || !invitationResult.data) {
    notFound();
  }

  const invitation = normalizeInvitationResponse(invitationResult.data);
  let guest = null;

  if (resolvedSearchParams?.tamu) {
    const guestResult = await getInvitationGuest(slug, resolvedSearchParams.tamu);
    if (guestResult.ok && guestResult.data) {
      guest = guestResult.data;
    }
  }

  return <InvitationPageShell invitation={invitation} guest={guest} />;
}
