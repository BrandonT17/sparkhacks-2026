import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <div className="flex flex-col text-center gap-4 text-sm text-muted-foreground mt-auto">
      <Separator />
      <p>Made 2026 by Brandon Thach, Syed Daanish Ismail, Phillip Pham, Omar Khan</p>
      <p>Powered by Next.js, Shadcn, Clerk, Supabase & Gemini</p>
    </div>
  );
}
