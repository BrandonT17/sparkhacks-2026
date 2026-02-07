import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 p-4 items-center">
        
        <div className="flex justify-start">
        </div>

        <div className="flex justify-center">
          <Image
            src="/logo1.png"
            alt="logo"
            width={150}
            height={150}
            className="h-auto" 
            priority 
          />
        </div>

        <div className="flex justify-end items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
      <Separator />
    </div>
  );
}