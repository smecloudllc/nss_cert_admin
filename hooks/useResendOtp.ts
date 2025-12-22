// "use client";
// import { IOTPModel, useResendOtpStore } from "@/store/auth";
// import { useTempUserStore } from "@/store/tempUser";
// import { LoginService } from "@/services/auth";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// export default function useResendOtp() {
//   // state
//   const [otpLoad, setOtpLoad] = useState(false);
//   const [cooldown, setCooldown] = useState(0); // in seconds

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (cooldown > 0) {
//       timer = setInterval(() => {
//         setCooldown((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [cooldown]);

//   //   hooks
//   const { setTempUser } = useTempUserStore();

//   // function
//   const resendOtp = async (OTPData: IOTPModel) => {
//     setOtpLoad(true);
//     try {
//       const response = await LoginService(OTPData);
//       setCooldown(120);
//       if (response.success) {
//         toast.success("OTP resend successful", {
//           style: {
//             backgroundColor: "#18464b",
//             color: "white",
//           },
//         });
//         setTempUser({
//           username: OTPData?.username ?? "",
//           token: response.info.token,
//           two_factor: response.info.two_factor,
//         });
//       }
//     } finally {
//       setOtpLoad(false);
//     }
//   };
//   return {
//     resendOtp,
//     otpLoad,
//     cooldown,
//   };
// }
