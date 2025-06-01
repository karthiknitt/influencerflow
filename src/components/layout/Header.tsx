import React from "react";
import {
  SignInButton,
  UserButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 text-gray-900 dark:text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">InfluencerFlow</div>
        <div className="flex items-center gap-4">
          <div>Language Switcher Placeholder</div>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="hover:text-primary transition-colors"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="hover:text-primary transition-colors"
              >
                Dashboard
              </a>
              {typeof window !== 'undefined' && <UserButton afterSignOutUrl="/" />}
              <SignOutButton>
                <Button variant="outline">Sign Out</Button>
              </SignOutButton>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
