"use client";
import Animation from "@/components/animations/animations";
import Login from "@/components/forms/auth/login/login";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <Animation>
      <div className="flex flex-col items-center justify-center h-screen w-full ">
        {/* Form goes here */}
        <div className="flex flex-col items-center justify-center h-full p-4 space-y-6 ">
          {/* <Image
            src={"/images/Logo.png"}
            alt="Zedi Logo"
            width={50}
            height={50}
          /> */}
          <motion.section
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "anticipate",
            }}
            className="p-6 rounded-full text-white shadow-lg
    bg-[length:200%_200%]
    bg-gradient-to-br 
    from-red-600/80 
    via-yellow-400/80 
    to-green-600/80"
          ></motion.section>

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
