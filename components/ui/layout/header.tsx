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
      {/* Changing to a grid with 3 columns. 
        Items-center keeps them vertically aligned. 
      */}
      <div className="grid grid-cols-3 p-4 items-center">
        
        {/* 1. Left Slot: Empty (or put a menu button here later) */}
        <div className="flex justify-start">
           {/* Placeholder for future left-side content */}
        </div>

        {/* 2. Center Slot: The Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo1.png"
            alt="logo"
            width={150}
            height={150}
            className="h-auto" // Keeps aspect ratio clean
            priority // Good practice for header logos
          />
        </div>

        {/* 3. Right Slot: Auth Buttons */}
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