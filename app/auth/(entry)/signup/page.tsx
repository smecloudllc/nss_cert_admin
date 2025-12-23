"use client";
import SignUp from "@/components/forms/auth/signup/signup";
import { NSALOGO } from "@/public/images";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side - Image  */}
      <div className="relative hidden lg:block bg-brand-primary dark:bg-brand-lime">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/80 to-brand-lime/80 dark:from-brand-lime/90 dark:to-brand-primary/90" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
          <div className="rounded-full p-1 shadow  bg-white">
            <div className="w-20 h-20 shadow rounded-full overflow-hidden flex items-center justify-center bg-gray-200 shrink-0">
              <Image
                src={NSALOGO}
                alt="User Image"
                width={100}
                height={32}
                quality={100}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
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
      <div className="flex flex-col  justify-center py-5 items-center  md:p-10 bg-white dark:bg-neutral-900">
        {/* Form Container */}
        <div className="py-14">
          <h1 className="text-4xl font-bold text-center">Welcome</h1>
          <p className="text-sm text-neutral-500 max-w-xs text-center">
            Please provide your details below to complete your account setup
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
