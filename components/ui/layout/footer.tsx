import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <div className="flex flex-col gap-4 py-4 text-center text-sm text-muted-foreground">
      <Separator />
      <p>Made 2026 by Brandon Thach, Syed Daanish Ismail, Phillip Pham, Omar Khan</p>
      <p>Powered by Next.js, Shadcn, Clerk, Supabase & Gemini</p>
    </div>
  );
}
