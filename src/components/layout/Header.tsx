import React from "react";
import SignInModal from "./SignInModal";

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 text-gray-900 dark:text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">InfluencerFlow</div>
        <div className="flex items-center gap-4">
          <div>Language Switcher Placeholder</div>
          <SignInModal />
        </div>
      </div>
    </header>
  );
};

export default Header;
