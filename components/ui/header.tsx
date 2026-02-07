import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <div className="">
      <div className="flex flex-row justify-between p-4 items-center">
        <Image src="/logo1.png" alt="logo" width={150} height={150} />
        <h1>Your personal AI stylist.</h1>
        <Button>Sign In</Button>
      </div>
      <Separator />
    </div>
  );
}
