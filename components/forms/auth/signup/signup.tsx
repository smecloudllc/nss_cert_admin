// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Loader2Icon } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import * as z from "zod";

// import {
//   UiButton,
//   UiCheckbox,
//   UiForm,
//   UiInput,
//   UiLabel,
//   UiPhoneInput,
// } from "@/components/ui";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import { useTempUserStore } from "@/store/tempUser";
// // import { useResendOtpStore } from "@/store/auth";
// // import { LoginService } from "@/services/auth";

// import { routes } from "@/routes";
// import { IDCardInput } from "@/components/ui/ghana-card";
// import { deobfuscateString } from "@/lib/utils";
// import { DecodedDataType } from "@/interfaces";

// // This is for form schema
// const formSchema = z.object({
//   full_name: z.string().min(1, {
//     message: "Username field is required",
//   }),
//   email: z.string().min(1, {
//     message: "Email field is required",
//   }),
//   phone_number: z
//     .string()
//     .min(10, "Enter a valid mobile number")
//     .refine((value) => /^\d+$/.test(value.replace(/\+/g, "")), {
//       message: "Phone number must be numeric",
//     }),
//   ghana_card: z.string().min(10, "Ennter a valid ghana card"),
//   terms: z.boolean(),
// });

// export default function SignUp() {
//   /**
//    * State
//    */
//   const [decodedData, setDecodedData] = useState<DecodedDataType | null>(null);
//   const [loading, setLoading] = useState(false);

//   /**
//    * Hooks
//    */
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     mode: "onBlur",
//     defaultValues: {
//       full_name: decodedData?.first_name + " " + decodedData?.last_name || "",
//       email: decodedData?.email || "",
//       phone_number: decodedData?.phone || "",
//       ghana_card: "",
//       terms: false,
//     },
//   });

//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const token = searchParams.get("token");
//     // console.log('Retrieved token:', token);
//     if (token) {
//       const decoded = deobfuscateString(token);
//       // console.log('Decoded string:', decoded);
//       if (decoded) {
//         const parsedData = JSON.parse(decoded);
//         // console.log('Parsed data:', parsedData);
//         setDecodedData(parsedData);

//         // updateAuthStore({
//         //   signupData: parsedData,
//         // });
//       }
//     }
//   }, []);

//   const handleSubmit = async (formdata: z.infer<typeof formSchema>) => {
//     setLoading(true);

//     // setOtpStore({
//     //   admin: formdata.admin,
//     //   device: `${deviceInfo.device} - ${deviceInfo.browser.name} - ${deviceInfo.browser.version} - ${deviceInfo.os}`,
//     //   password: formdata.password,
//     //   username: formdata.username,
//     // });

//     try {
//       // const response = await LoginService({
//       //   ...formdata,
//       //   device: `${deviceInfo.device} - ${deviceInfo.browser.name} - ${deviceInfo.browser.version} - ${deviceInfo.os}`,
//       // });

//       // localStorage.setItem("temp-token", response.info.token);
//       // setTempUser({
//       //   username: formdata.username,
//       //   token: response.info.token,
//       //   two_factor: response.info.two_factor,
//       // });
//       console.log("");
//       router.push(routes.auth.otp);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="flex flex-col mb-20 gap-y-2  w-88 ">
//       <div className="space-y-2">
//         <UiForm.Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleSubmit)}
//             className="flex flex-col space-y-4"
//           >
//             <UiForm.FormField
//               control={form.control}
//               name="full_name"
//               render={({ field }) => (
//                 <UiForm.FormItem>
//                   <UiForm.FormLabel className=" text-gray-500 text-sm">
//                     Full Name
//                   </UiForm.FormLabel>
//                   <UiForm.FormControl>
//                     <UiInput.Input
//                       placeholder="Eg. Kwaku Ofori"
//                       className=" py-6 px-4"
//                       {...field}
//                     />
//                   </UiForm.FormControl>
//                   <UiForm.FormMessage />
//                 </UiForm.FormItem>
//               )}
//             />
//             <UiForm.FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <UiForm.FormItem>
//                   <UiForm.FormLabel className=" text-gray-500 text-sm">
//                     Email
//                   </UiForm.FormLabel>
//                   <UiForm.FormControl>
//                     <UiInput.Input
//                       placeholder="kwesimail@mail.com"
//                       className=" py-6 px-4"
//                       {...field}
//                     />
//                   </UiForm.FormControl>
//                   <UiForm.FormMessage />
//                 </UiForm.FormItem>
//               )}
//             />
//             <UiForm.FormField
//               control={form.control}
//               name="phone_number"
//               render={({ field }) => (
//                 <UiForm.FormItem>
//                   <UiForm.FormLabel className=" text-gray-500 text-sm">
//                     Phone
//                   </UiForm.FormLabel>
//                   <UiForm.FormControl>
//                     <UiPhoneInput.PhoneInput
//                       placeholder="Enter phone number"
//                       defaultCountry="gh"
//                       {...field}
//                       value={field.value}
//                       onChange={field.onChange}
//                     />
//                   </UiForm.FormControl>
//                   <UiForm.FormMessage />
//                 </UiForm.FormItem>
//               )}
//             />
//             <UiForm.FormField
//               control={form.control}
//               name="ghana_card"
//               render={({ field }) => (
//                 <UiForm.FormItem>
//                   <UiForm.FormLabel className=" text-gray-500 text-sm">
//                     ID Card Number
//                   </UiForm.FormLabel>
//                   <UiForm.FormControl>
//                     <IDCardInput
//                       {...field}
//                       onChange={field.onChange}
//                       defaultCountry="GHA"
//                     />
//                   </UiForm.FormControl>
//                   <UiForm.FormDescription>
//                     Enter your national ID card number (e.g., GHA-12345678-A)
//                   </UiForm.FormDescription>
//                   <UiForm.FormMessage />
//                 </UiForm.FormItem>
//               )}
//             />

//             {/* Check box */}
//             <UiForm.FormField
//               control={form.control}
//               name="terms"
//               render={({ field }) => (
//                 <UiForm.FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                   <UiForm.FormControl>
//                     <UiCheckbox.Checkbox
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                     />
//                   </UiForm.FormControl>
//                   <div className="space-y-1 leading-none">
//                     <UiForm.FormLabel>
//                       I agree to the terms and conditions
//                     </UiForm.FormLabel>
//                     <UiForm.FormDescription>
//                       You can read our terms and conditions here.
//                     </UiForm.FormDescription>
//                   </div>
//                   <UiForm.FormMessage />
//                 </UiForm.FormItem>
//               )}
//             />

//             <UiButton.Button
//               type="submit"
//               className="h-12 mt-3 font-semibold rounded-full dark:text-white bg-brand-primary disabled:bg-brand-secondary hover:bg-brand-primary/50"
//               disabled={
//                 loading ||
//                 !form.formState.isValid ||
//                 form.formState.isSubmitting
//               }
//             >
//               {loading ? (
//                 <Loader2Icon className="animate-spin" />
//               ) : (
//                 "Create account"
//               )}
//             </UiButton.Button>
//           </form>
//         </UiForm.Form>
//       </div>
//     </main>
//   );
// }

"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as z from "zod";

import {
  UiButton,
  UiCheckbox,
  UiForm,
  UiInput,
  UiLabel,
  UiPhoneInput,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { routes } from "@/routes";
import { IDCardInput } from "@/components/ui/ghana-card";
import { deobfuscateString } from "@/lib/utils";
import { DecodedDataType } from "@/interfaces";

// Form schema
const formSchema = z.object({
  full_name: z.string().min(1, {
    message: "Username field is required",
  }),
  email: z.string().min(1, {
    message: "Email field is required",
  }),
  phone_number: z
    .string()
    .min(10, "Enter a valid mobile number")
    .refine((value) => /^\d+$/.test(value.replace(/\+/g, "")), {
      message: "Phone number must be numeric",
    }),
  ghana_card: z.string().min(10, "Enter a valid ghana card"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

function SignUpContent() {
  /**
   * State
   */
  const [decodedData, setDecodedData] = useState<DecodedDataType | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * Hooks
   */
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      ghana_card: "",
      terms: false,
    },
  });

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      const decoded = deobfuscateString(token);
      if (decoded) {
        const parsedData = JSON.parse(decoded);
        setDecodedData(parsedData);

        // Update form values
        form.setValue(
          "full_name",
          `${parsedData.first_name || ""} ${parsedData.last_name || ""}`.trim()
        );
        form.setValue("email", parsedData.email || "");
        form.setValue("phone_number", parsedData.phone || "");
      }
    }
  }, [searchParams, form]);

  const handleSubmit = async (formdata: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      console.log("Form data:", formdata);
      router.push(routes.auth.otp);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col mb-20 gap-y-2 w-88">
      <div className="space-y-2">
        <UiForm.Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-4"
          >
            <UiForm.FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <UiForm.FormItem>
                  <UiForm.FormLabel className="text-gray-500 text-sm">
                    Full Name
                  </UiForm.FormLabel>
                  <UiForm.FormControl>
                    <UiInput.Input
                      placeholder="Eg. Kwaku Ofori"
                      className="py-6 px-4"
                      {...field}
                    />
                  </UiForm.FormControl>
                  <UiForm.FormMessage />
                </UiForm.FormItem>
              )}
            />

            <UiForm.FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <UiForm.FormItem>
                  <UiForm.FormLabel className="text-gray-500 text-sm">
                    Email
                  </UiForm.FormLabel>
                  <UiForm.FormControl>
                    <UiInput.Input
                      placeholder="kwesimail@mail.com"
                      className="py-6 px-4"
                      {...field}
                    />
                  </UiForm.FormControl>
                  <UiForm.FormMessage />
                </UiForm.FormItem>
              )}
            />

            <UiForm.FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <UiForm.FormItem>
                  <UiForm.FormLabel className="text-gray-500 text-sm">
                    Phone
                  </UiForm.FormLabel>
                  <UiForm.FormControl>
                    <UiPhoneInput.PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="gh"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </UiForm.FormControl>
                  <UiForm.FormMessage />
                </UiForm.FormItem>
              )}
            />

            <UiForm.FormField
              control={form.control}
              name="ghana_card"
              render={({ field }) => (
                <UiForm.FormItem>
                  <UiForm.FormLabel className="text-gray-500 text-sm">
                    ID Card Number
                  </UiForm.FormLabel>
                  <UiForm.FormControl>
                    <IDCardInput
                      value={field.value}
                      onChange={field.onChange}
                      defaultCountry="GHA"
                    />
                  </UiForm.FormControl>
                  <UiForm.FormDescription>
                    Enter your national ID card number (e.g., GHA-12345678-A)
                  </UiForm.FormDescription>
                  <UiForm.FormMessage />
                </UiForm.FormItem>
              )}
            />

            {/* Check box */}
            <UiForm.FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <UiForm.FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <UiForm.FormControl>
                    <UiCheckbox.Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </UiForm.FormControl>
                  <div className="space-y-1 leading-none">
                    <UiForm.FormLabel>
                      I agree to the terms and conditions
                    </UiForm.FormLabel>
                    <UiForm.FormDescription>
                      You can read our terms and conditions here.
                    </UiForm.FormDescription>
                  </div>
                  <UiForm.FormMessage />
                </UiForm.FormItem>
              )}
            />

            <UiButton.Button
              type="submit"
              className="h-12 mt-3 font-semibold rounded-full dark:text-white bg-brand-primary disabled:bg-brand-secondary hover:bg-brand-primary/50"
              disabled={
                loading ||
                !form.formState.isValid ||
                form.formState.isSubmitting
              }
            >
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Create account"
              )}
            </UiButton.Button>
          </form>
        </UiForm.Form>
      </div>
    </main>
  );
}

export default function SignUp() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2Icon className="animate-spin" />
        </div>
      }
    >
      <SignUpContent />
    </Suspense>
  );
}
