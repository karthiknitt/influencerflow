"use client";

import { SignIn } from "@clerk/nextjs";

const SignInSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6 flex justify-center">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Sign In</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to your account to continue.
            </p>
          </div>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                footerActionLink: "text-blue-600 hover:text-blue-700",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default SignInSection;