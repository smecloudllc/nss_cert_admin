"use client";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

import OtpInput from "@/components/forms/auth/login/otp-input";
import Animation from "@/components/animations/animations";
// import { useTempUserStore } from "@/store/tempUser";
import { routes } from "@/routes";

export default function Page() {
  /**
   * Hooks
   */
  // const { tempUser } = useTempUserStore();

  return (
    <Animation>
      <div className="h-screen flex flex-col justify-center items-center">
        <section className="flex flex-col items-center justify-center space-y-6">
          {/* icon */}
          <div className="rounded-full bg-brand-secondary/80 p-2">
            <div className="rounded-full border-6 border-brand-primary p-3">
              <Mail size={28} className="text-brand-primary" />
            </div>
          </div>
          {/* Headers */}
          <section className="my-4">
            <h1 className="text-center font-bold text-4xl ">
              Check your email
            </h1>
            <p className="text-center my-2 w-xs text-sm">
              Hi{" "}
              <span className="text-md font-bold text-brand-primary dark:text-brand-secondary ">
                {/* " {tempUser?.username} " */} " kwakumail@mail.com "
              </span>
              , Kindly enter the 6-digit code sent to your email. This code will
              expire in 5 minutes.
            </p>
          </section>

          {/* form goes here */}
          <OtpInput />

          {/* Back button */}
          <Link
            href={routes.auth.login}
            className="flex items-center justify-center mt-2 "
          >
            <ArrowLeft size={20} className="mr-2 " />
            Back to log in
          </Link>
        </section>
      </div>
    </Animation>
  );
}
