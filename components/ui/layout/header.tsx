import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Image from "next/image";

export default function Header() {
  return (
    <div className="">
      <div className="flex md:flex-row gap-4 flex-col justify-between p-4 items-center">
        <Image src="/logo1.png" alt="logo" width={150} height={150} className="order-2 md:order-none"/>
        <h1 className="order-1 md:order-none">Your personal AI stylist.</h1>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3 order-3 md:order-none">
          {/* Show Sign In and Sign Up when user is signed out */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* Show User Button when user is signed in */}
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
      <Separator />
    </div>
  );
}