import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Assuming react-icons is installed

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 md:py-18 lg:py-24 border-t border-gray-200 dark:border-gray-800">
      <div className="container px-4 md:px-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
        <div className="grid gap-1">
          <h3 className="text-sm font-semibold tracking-wider uppercase">Product</h3>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Integrations
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            API
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            About Us
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Careers
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Blog
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="text-sm font-semibold tracking-wider uppercase">Resources</h3>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Documentation
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Support
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            FAQs
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Tutorials
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            Terms of Service
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="text-sm font-semibold tracking-wider uppercase">Connect</h3>
          <div className="flex space-x-4">
            <Link href="#" prefetch={false}>
              <FaTwitter className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
            <Link href="#" prefetch={false}>
              <FaLinkedin className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
            <Link href="#" prefetch={false}>
              <FaGithub className="h-6 w-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
          </div>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; 2024 InfluencerFlow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;