import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function SiteLayout({ children }) {
  return (
    <>
      {children}
      <FloatingWhatsApp />
    </>
  );
}
