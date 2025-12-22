"use client";
import SignUp from "@/components/forms/auth/signup/signup";
import { CertificateIcon } from "@phosphor-icons/react";
import { GalleryVerticalEnd } from "lucide-react";
// import { SignupForm } from "@/components/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side - Image  */}
      <div className="relative hidden lg:block bg-brand-primary dark:bg-brand-lime">
        {/* <Image
          src="/placeholder.svg" // Replace with your image
          alt="Signup illustration"
          fill
          className="object-cover opacity-90 dark:brightness-75"
          priority
        /> */}

        {/* Optional: Overlay with text */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/80 to-brand-lime/80 dark:from-brand-lime/90 dark:to-brand-primary/90" />

        {/* Optional: Add some text/branding on the image side */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <h2 className="text-5xl max-w-sm font-bold mb-4 text-center">
            Welcome to NSS Certificate Portal
          </h2>
          <p className="text-lg text-center text-white/90 max-w-sm">
            Help thousands of users reach their career goals - every print at a
            time
          </p>
        </div>
      </div>

      {/* Right Side - Form */}

      <div className="flex flex-col  justify-center py-6 items-center  md:p-10 bg-white dark:bg-neutral-900">
        {/* Logo/Brand */}
        <div className="flex justify-center gap-2 md:justify-start">
          <p className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
            <div className="bg-brand-primary dark:bg-brand-secondary text-white dark:text-brand-primary flex size-8 items-center justify-center rounded-md">
              <CertificateIcon className="size-5" />
            </div>
            <span className="text-xl font-bold">NSS Certificate Portal</span>
          </p>
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
