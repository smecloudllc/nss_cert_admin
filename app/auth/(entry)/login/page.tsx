"use client";
import Animation from "@/components/animations/animations";
import Login from "@/components/forms/auth/login/login";
import { NSALOGO } from "@/public/images";
import Image from "next/image";

export default function Page() {
  return (
    <Animation>
      <div className="flex flex-col items-center justify-center h-screen w-full ">
        {/* Form goes here */}
        <div className="flex flex-col items-center justify-center h-full p-4 space-y-6 ">
          <div className="rounded-full p-1 shadow">
            <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 shrink-0">
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

          {/* Form component */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className=" font-semibold text-2xl  text-center w-sm">
              Welcome to the NSS Certificate Admin Portal{" "}
            </h1>
            <p className=" w-xs text-sm text-center">
              Sign in to manage operations, monitor actions, and stay informed.
            </p>
            <Login />
          </div>

          {/* copy right */}
          <p className=" text-sm">
            © NSS 2025 | All Rights Reserved {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </Animation>
  );
}
